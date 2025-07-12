import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trips from "./pages/Trips";
import CompanyProfile from "./pages/companyDetails";

function App() {
  return (
    <>
      {/* <ThemeProvider>
        <BrowserRouter>
          <Routes>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Toaster /> */}
      <CompanyProfile />
    </>
  );
}

export default App;
