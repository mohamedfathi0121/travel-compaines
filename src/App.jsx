import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trips from "./pages/Trips";

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
      <Trips />
    </>
  );
}

export default App;
