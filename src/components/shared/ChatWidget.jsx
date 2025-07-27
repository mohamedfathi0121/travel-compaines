import { useEffect, useState, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import supabase from "../../utils/supabase";

dayjs.extend(relativeTime);

export default function ChatWidget({ userId, role }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [daysToShow, setDaysToShow] = useState(5);
  const [chatStatus, setChatStatus] = useState("open");
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Fetch existing chat & messages
  const fetchMessages = async () => {
    setLoading(true);

    const { data: chat, error: chatError } = await supabase
      .from("support_chats")
      .select("id, status")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (chatError) console.error(chatError);

    if (!chat) {
      setMessages([]);
      setChatStatus("open");
      setChatId(null);
      setLoading(false);
      return;
    }

    setChatStatus(chat.status);
    setChatId(chat.id);

    const sinceDate = dayjs()
      .subtract(daysToShow, "day")
      .startOf("day")
      .toISOString();

    const { data: msgs, error: msgError } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("chat_id", chat.id)
      .gte("created_at", sinceDate)
      .order("created_at", { ascending: true });

    if (msgError) console.error(msgError);
    else {
      setMessages(msgs);
      if (msgs.length < 20 || daysToShow >= 30) setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) fetchMessages();
  }, [daysToShow, isOpen]);

  // ✅ Real-time new messages
  useEffect(() => {
    if (!isOpen || !chatId) return;

    const channel = supabase
      .channel(`chat_${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `chat_id=eq.${chatId}`,
        },
        payload => {
          setMessages(current => {
            const filtered = current.filter(
              m =>
                !(
                  m.sender_id === payload.new.sender_id &&
                  m.message_text.trim() === payload.new.message_text.trim() &&
                  m.id.toString().startsWith("temp-")
                )
            );

            if (filtered.find(m => m.id === payload.new.id)) return filtered;

            return [...filtered, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOpen, chatId]);

  // ✅ Real-time chat status updates
  useEffect(() => {
    if (!chatId) return;

    const statusChannel = supabase
      .channel(`status_${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "support_chats",
          filter: `id=eq.${chatId}`,
        },
        payload => {
          setChatStatus(payload.new.status);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(statusChannel);
    };
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Start a new chat if old one is closed
  const handleStartNewChat = async () => {
    if (chatStatus !== "closed" && chatId) {
      alert("You already have an active chat.");
      return;
    }

    const { data, error } = await supabase
      .from("support_chats")
      .insert([{ user_id: userId, status: "open" }])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Failed to start a new chat.");
    } else {
      setChatId(data.id);
      setChatStatus("open");
      setMessages([]);
    }
  };

  // ✅ Send message via Supabase Edge Function (Optimistic UI)
  const handleSend = async () => {
    if (!input.trim() || chatStatus === "closed") return;

    const textToSend = input.trim();
    setInput("");

    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      sender_id: userId,
      message_text: textToSend,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMsg]);

    const { data, error } = await supabase.functions.invoke(
      "send-user-message",
      {
        body: {
          sender_id: userId,
          sender_role: role,
          message_text: textToSend,
        },
      }
    );

    if (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Try again.");
      setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
    } else {
      if (data?.chat_id) setChatId(data.chat_id);
    }
  };

  const groupMessagesByDate = messages =>
    messages.reduce((groups, msg) => {
      const date = dayjs(msg.created_at).format("YYYY-MM-DD");
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
      return groups;
    }, {});

  const grouped = groupMessagesByDate(messages);
  const loadMoreMessages = () => setDaysToShow(d => d + 5);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
        >
          <FaComments />
        </button>
      )}

      {isOpen && (
        <div className="mt-2 w-[400px] h-[550px] bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
            <span className="font-bold">
              {chatStatus === "closed"
                ? "Closed Chat (View Only)"
                : "Chat with Admin"}
            </span>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto text-sm">
            {loading && (
              <div className="text-center text-gray-500">Loading...</div>
            )}

            {hasMore && !loading && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={loadMoreMessages}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Load More
                </button>
              </div>
            )}

            {Object.entries(grouped).map(([date, msgs]) => (
              <div key={date}>
                <div className="text-center text-xs text-gray-500 mb-2">
                  {dayjs(date).format("dddd, MMMM D")}
                </div>
                {msgs.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender_id === userId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 mb-4 rounded-lg max-w-xs ${
                        msg.sender_id === userId
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white"
                      }`}
                    >
                      <div>{msg.message_text}</div>
                      <div
                        className={`text-xs mt-1 text-right ${
                          msg.sender_id === userId
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {dayjs(msg.created_at).format("h:mm A")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t dark:border-gray-700 p-2 flex">
            {chatStatus === "closed" ? (
              <button
                onClick={handleStartNewChat}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              >
                Start New Chat
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  className="flex-1 text-sm px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring text-gray-900 dark:text-white bg-white dark:bg-gray-800 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || chatStatus === "closed"} // ✅ Disable if input empty or chat closed
                  className={`ml-2 px-3 rounded text-sm ${
                    !input.trim() || chatStatus === "closed"
                      ? "bg-gray-400 text-white cursor-not-allowed" // Disabled style
                      : "bg-blue-600 text-white hover:bg-blue-700" // Active style
                  }`}
                >
                  Send
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
