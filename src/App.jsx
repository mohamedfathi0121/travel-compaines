import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeProvider";
import CompanyRegisterPage from "./pages/auth/Register";
function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CompanyRegisterPage />} />
         
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
