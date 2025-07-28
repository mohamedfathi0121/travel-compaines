
import { createContext, useContext, useState } from "react";
import { id } from "zod/v4/locales";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
const [tripData, setTripData] = useState({
  title: "",
  description: "",
  country: "",
  city: "",
  startDate: "",
  endDate: "",
  vrVideoUrl: "",         
  photoUrls: [],          
  locationURL: "",
  availableTickets: "",
priceSingle: "",
priceDouble: "",
priceTriple: "",
 company_id: "",
 id: "",
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












