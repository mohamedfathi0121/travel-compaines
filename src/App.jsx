import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeProvider";
import CompanyRegisterPage from "./pages/auth/Register";
import Trips from "./pages/Trips";
import CompanyProfilePage from "./pages/CompanyProfilePage";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CompanyRegisterPage />} />
            <Route path="trips" element={<Trips />} />
            <Route path="/company/:id" element={<CompanyProfilePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
