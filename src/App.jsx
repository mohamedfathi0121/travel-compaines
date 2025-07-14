import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { ThemeProvider } from "./context/ThemeProvider";
import { TripProvider } from "./context/TripContext";
import CompanyRegisterPage from "./pages/auth/Register";
import TripFormStep1 from "./pages/add trip/step1";
import TripFormStep2 from "./pages/add trip/step2";
import TripFormStep3 from "./pages/add trip/step3";
import TripFormStep4 from "./pages/add trip/step4";
import Trips from "./pages/Trips";
import Login from "./pages/login";
import CompanyProfilePage from "./pages/CompanyProfilePage";
function App() {
  return (
    <>
      <ThemeProvider>
        <TripProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CompanyRegisterPage />} />
              <Route path="login" element={<Login />} />
              <Route path="step1" element={<TripFormStep1 />} />
              <Route path="step2" element={<TripFormStep2 />} />
              <Route path="step3" element={<TripFormStep3 />} />
              <Route path="step4" element={<TripFormStep4 />} />
              <Route path="trips" element={<Trips />} />
              <Route path="/company/:id" element={<CompanyProfilePage />} />
            </Routes>
          </BrowserRouter>
        </TripProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
