import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    // Step 1
    title: "",
    description: "",
    country: "",
    city: "",
    startDate: "",
    endDate: "",

    // Step 2
    vrVideo: null,
    photos: [],

    // Step 3
    locationURL: "",
    availableTickets: "",

    // Step 4
    price: "",
    priceInclude: [],
    priceNotInclude: [],
  });

  const updateTripData = (newData) => {
    setTripData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <TripContext.Provider value={{ tripData, updateTripData }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
