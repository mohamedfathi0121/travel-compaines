import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TripFormStep1 from "./components/add trip/step1";
import TripFormStep2 from "./components/add trip/step2";
import TripFormStep3 from "./components/add trip/step3";
import TripFormStep4 from "./components/add trip/step4";
import { ThemeProvider } from "./context/ThemeProvider";
import { TripProvider } from "./context/TripContext";
import CompanyRegisterPage from "./pages/auth/Register";
import Login from "./pages/auth/login";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./components/layout/AuthLayout";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Trips from "./pages/Trips";
import CreateTrip from "./pages/CreateTrip";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import TripFormStep5 from "./components/repost-trip/step5";
import TripFormStep6 from "./components/repost-trip/step6";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <TripProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<CompanyRegisterPage />} />
                <Route path="trips" element={<Trips />} />
                <Route path="profile" element={<CompanyProfilePage />} />
                
                <Route path="create-trip" element={<CreateTrip />}>
                  <Route path="step1" element={<TripFormStep1 />} />
                  <Route path="step2" element={<TripFormStep2 />} />
                  <Route path="step3" element={<TripFormStep3 />} />
                  <Route path="step4" element={<TripFormStep4 />} />
                </Route>
                <Route path="repost-trip" element={<CreateTrip />}>
                  <Route path="step5" element={<TripFormStep5 />} />
                  <Route path="step6" element={<TripFormStep6 />} />
                </Route>
              </Route>
            </Routes>
          </TripProvider>
        </BrowserRouter>
      </AuthProvider>

        <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "var(--color-background)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-input)",
          },
          success: {
            style: {
              background: "var(--color-background)",
              color: "var(--color-text-primary)",
              border: "2px solid #10B981", // Success green color
            },
            iconTheme: {
              primary: "#10B981", // Success green color
              secondary: "white",
            },
          },
          error: {
            style: {
              background: "var(--color-background)",
              color: "var(--color-text-primary)",
              border: "2px solid #EF4444", // Error red color
            },
            iconTheme: {
              primary: "#EF4444", // Error red color
              secondary: "white",
            },
          },
        }}
      />
    </>
  );
}

export default App;