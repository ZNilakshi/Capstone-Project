import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgeVerification from "./components/AgeVerification";

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <AgeVerification />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
