// import { Helmet } from "react-helmet";
import { useState } from "react";
import aImage from "../assets/a.jpg";
import bImage from "../assets/b.jpg";
import cImage from "../assets/c.jpg";

export default function Trips() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = ["upcoming", "past", "ongoing"];

  const trips = {
    upcoming: [
      {
        id: 1,
        title: "Paris Trip",
        subtitle: "Trip to Paris",
        date: "Oct 20 - Oct 25",
        image: aImage,
      },
      {
        id: 2,
        title: "London Trip",
        subtitle: "Trip to London",
        date: "Nov 10 - Nov 15",
        image: bImage,
      },
      {
        id: 3,
        title: "Cairo Trip",
        subtitle: "Trip to Cairo",
        date: "Oct 20 - Oct 25",
        image: cImage,
      },
      {
        id: 4,
        title: "Aswan Trip",
        subtitle: "Trip to Aswan",
        date: "Nov 10 - Nov 15",
        image: aImage,
      },
    ],
    ongoing: [
      {
        id: 1,
        title: "Business Development Conference",
        date: "Oct 26 - 28",
        location: "San Francisco, CA",
        travelers: 4,
      },
      {
        id: 2,
        title: "Sales Team Retreat",
        date: "Nov 15 - 18",
        location: "Miami, FL",
        travelers: 10,
      },
      {
        id: 3,
        title: "Marketing Strategy Workshop",
        date: "Dec 5 - 7",
        location: "New York, NY",
        travelers: 6,
      },
      {
        id: 4,
        title: "Product Design Sprint",
        date: "Jan 10 - 12",
        location: "Austin, TX",
        travelers: 5,
      },
      {
        id: 5,
        title: "Customer Success Training",
        date: "Feb 20 - 22",
        location: "Chicago, IL",
        travelers: 8,
      },
    ],
    past: [
      {
        id: 1,
        title: "Team Offsite to San Francisco",
        date: "Oct 16 - Oct 20",
        location: "San Francisco, CA",
      },
      {
        id: 2,
        title: "Product Team Retreat",
        date: "Sep 10 - Sep 15",
        location: "Lake Tahoe, CA",
      },
      {
        id: 3,
        title: "Sales Kickoff",
        date: "Aug 22 - Aug 25",
        location: "Las Vegas, NV",
      },
      {
        id: 4,
        title: "Marketing Team Offsite",
        date: "Jul 15 - Jul 18",
        location: "Austin, TX",
      },
      {
        id: 5,
        title: "Engineering Team Retreat",
        date: "Jun 5 - Jun 10",
        location: "Seattle, WA",
      },
    ],
  };

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

        {activeTab === "past" && (
          <div>
            <h2 className="text-lg font-semibold mb-4 capitalize text-text-primary">
              Past trips
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
                      <td className="px-4 py-2 whitespace-nowrap">
                        {trip.title}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {trip.date}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {trip.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "ongoing" && (
          <div>
            <h2 className="text-lg font-semibold mb-4 capitalize text-text-primary">
              Ongoing trips
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-background border border-text-secondary rounded-md">
                <thead>
                  <tr className="bg-accent text-left text-sm font-medium text-text-secondary">
                    <th className="px-4 py-2">Trip</th>
                    <th className="px-4 py-2">Dates</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Travelers</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.ongoing.map((trip) => (
                    <tr
                      key={trip.id}
                      className="text-sm text-text-primary border-t"
                    >
                      <td className="px-4 py-2 whitespace-nowrap">
                        {trip.title}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {trip.date}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {trip.location}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {trip.travelers}
                      </td>
                      <td className="px-4 py-2">
                        <span className="bg-text-hard-secondary text-text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          In progress
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "upcoming" && (
          <div>
            <h2 className="text-lg font-semibold capitalize mb-4 text-text-primary">
              Upcoming Trips
            </h2>
            {trips.upcoming.map((trip) => (
              <div
                key={trip.id}
                className="flex flex-col sm:flex-row items-start mb-6 sm:space-x-6 border-b border-text-secondary pb-4"
              >
                <div className="flex-1 mb-4 sm:mb-0">
                  <p className="text-sm text-text-secondary">{trip.subtitle}</p>
                  <h3 className="text-xl font-medium text-text-primary">
                    {trip.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2">
                    {trip.date}
                  </p>
                  <div className="flex gap-2">
                    <button className="bg-button-danger hover:bg-button-danger-hover hover:shadow-sm shadow-text-secondary  text-background px-3 py-1 rounded text-sm">
                      DELETE
                    </button>
                  </div>
                </div>
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full sm:w-48 h-32 object-cover rounded-lg"
                />
              </div>
            ))}
            <div className="text-right mt-6">
              <button className="bg-button-primary hover:bg-button-primary-hover hover:shadow-sm shadow-text-secondary text-button-text px-4 py-2 rounded text-sm">
                Add New Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
