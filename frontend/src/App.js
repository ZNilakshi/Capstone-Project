import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgeVerification from "./components/AgeVerification";
import WineStore from "./pages/WineStore";
import "./App.css";
import Account from "./components/Account";
function App() {
  return (
    <Router>
      <Navbar />
      <AgeVerification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WineStore" element={<WineStore />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
