import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TripFormStep1 from "./pages/add trip/step1";
import TripFormStep2 from "./pages/add trip/step2";
import TripFormStep3 from "./pages/add trip/step3";
import TripFormStep4 from "./pages/add trip/step4";
import { ThemeProvider } from "./context/ThemeProvider";
import { TripProvider } from "./context/TripContext";
import CompanyRegisterPage from "./pages/auth/Register";
import Login from "./pages/auth/login";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./components/layout/AuthLayout";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Trips from "./pages/Trips";
import CompanyProfilePage from "./pages/CompanyProfilePage";
function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <TripProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<CompanyRegisterPage />} />
                </Route>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="trips" element={<Trips />} />
                  <Route path="profile" element={<CompanyProfilePage />} />
                  <Route path="step1" element={<TripFormStep1 />} />
                  <Route path="step2" element={<TripFormStep2 />} />
                  <Route path="step3" element={<TripFormStep3 />} />
                  <Route path="step4" element={<TripFormStep4 />} />
                </Route>

                <Route path="step1" element={<TripFormStep1 />} />
                <Route path="step2" element={<TripFormStep2 />} />
                <Route path="step3" element={<TripFormStep3 />} />
                <Route path="step4" element={<TripFormStep4 />} />
              </Routes>
            </BrowserRouter>
          </TripProvider>
        </AuthProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
