import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { Link } from "react-router-dom";

export default function Trips() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [trips, setTrips] = useState({
    upcoming: [],
    ongoing: [],
    past: [],
  });

  const tabs = ["upcoming", "ongoing", "past"];

  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase.from("trip_schedules").select(`
          id,
          start_date,
          end_date,
          status,
          location_url,
          base_trips (
            id,
            title,
            description,
            photo_urls,
            city
          )
        `);

      if (error) {
        console.error("Error fetching trips:", error.message);
        return;
      }

      const today = new Date();
      const upcoming = [];
      const ongoing = [];
      const past = [];

      data.forEach((trip) => {
        const start = new Date(trip.start_date);
        const end = new Date(trip.end_date);

        const tripData = {
          id: trip.id,
          baseTripId: trip.base_trips?.id,
          title: trip.base_trips?.title || "Untitled",
          subtitle: trip.base_trips?.description || "",
          date: `${trip.start_date} - ${trip.end_date}`,
          image: trip.base_trips?.photo_urls?.[0] || "",
          location: trip.base_trips?.city || "Unknown",
        };

        if (start > today) {
          upcoming.push(tripData);
        } else if (start <= today && end >= today) {
          ongoing.push(tripData);
        } else {
          past.push(tripData);
        }
      });

      setTrips({ upcoming, ongoing, past });
    };

    fetchTrips();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 flex justify-center">
      {/* <Helmet>
        <title>Trips | Travelr</title>
      </Helmet> */}
      <div className="w-full max-w-6xl">
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">
            Trips
          </h1>
          <div className="flex flex-wrap gap-2 sm:space-x-4 text-sm font-medium border-b border-text-secondary">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-text-primary text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Trips */}
        {activeTab === "upcoming" && (
          <div>
            <h2 className="text-lg font-semibold capitalize mb-4 text-text-primary">
              Upcoming Trips
            </h2>
            {trips.upcoming.length === 0 ? (
              <p className="text-text-secondary">No upcoming trips found.</p>
            ) : (
              trips.upcoming.map((trip) => (
                <div
                  key={trip.id}
                  className="flex flex-col sm:flex-row items-start mb-6 sm:space-x-6 border-b border-text-secondary pb-4"
                >
                  <div className="flex-1 mb-4 sm:mb-0">
                    <p className="text-sm text-text-secondary">
                      {trip.subtitle}
                    </p>
                    <h3 className="text-xl font-medium text-text-primary">
                      {trip.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">
                      {trip.date}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {trip.location}
                    </p>
                    <div className="flex gap-2">
                      <Link
                        to={`/repost-trip/step5/${trip.baseTripId}`}
                        className="bg-button-primary hover:bg-button-primary-hover text-background px-3 py-1 rounded text-sm"
                      >
                        Repost
                      </Link>
                    </div>
                  </div>
                  {trip.image && (
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full sm:w-48 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Ongoing Trips */}
        {activeTab === "ongoing" && (
          <div>
            <h2 className="text-lg font-semibold mb-4 capitalize text-text-primary">
              Ongoing Trips
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-background border border-text-secondary rounded-md">
                <thead>
                  <tr className="bg-accent text-left text-sm font-medium text-text-secondary">
                    <th className="px-4 py-2">Trip</th>
                    <th className="px-4 py-2">Dates</th>
                    <th className="px-4 py-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.ongoing.map((trip) => (
                    <tr
                      key={trip.id}
                      className="text-sm text-text-primary border-t"
                    >
                      <td className="px-4 py-2">{trip.title}</td>
                      <td className="px-4 py-2">{trip.date}</td>
                      <td className="px-4 py-2">{trip.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Past Trips */}
        {activeTab === "past" && (
          <div>
            <h2 className="text-lg font-semibold mb-4 capitalize text-text-primary">
              Past Trips
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-background border border-text-secondary rounded-md">
                <thead>
                  <tr className="bg-accent text-left text-sm font-medium text-text-secondary">
                    <th className="px-4 py-2">Trip</th>
                    <th className="px-4 py-2">Dates</th>
                    <th className="px-4 py-2">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.past.map((trip) => (
                    <tr
                      key={trip.id}
                      className="text-sm text-text-primary border-t"
                    >
                      <td className="px-4 py-2">{trip.title}</td>
                      <td className="px-4 py-2">{trip.date}</td>
                      <td className="px-4 py-2">{trip.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Link
        to="/create-trip/step1"
        className=" fixed bottom-4 right-4 bg-button-primary hover:bg-button-primary-hover shadow-text-secondary hover:shadow-sm text-button-text font-bold py-2 px-4 rounded transition duration-300"
      >
        Create Trip
      </Link>{" "}
    </div>
  );
}
