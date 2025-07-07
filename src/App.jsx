import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ThemeProvider} from "./context/ThemeProvider";
import TripFormStep1 from "./pages/add trip/step1";
import TripFormStep2 from "./pages/add trip/step2";
import TripFormStep3 from "./pages/add trip/step3";
import TripFormStep4 from "./pages/add trip/step4";
function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
 <Route path="/" element={<TripFormStep1 />} />
  <Route path="/step2" element={<TripFormStep2 />} />
  <Route path="/step3" element={<TripFormStep3 />} />
  <Route path="/step4" element={<TripFormStep4 />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
