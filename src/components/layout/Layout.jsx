import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { useAuth } from "../../hooks/useAuth";
import ChatWidget from "../shared/ChatWidget";

export default function Layout() {
    const { user } = useAuth();

  return (
    <div>
      <Header />
      <Outlet />
       {user && (
        <ChatWidget userId={user.id} role="company_user" />
      )}
      <Footer />
    </div>
  );
}
