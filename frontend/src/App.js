import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgeVerification from "./components/AgeVerification";
import WineStore from "./pages/WineStore";
import "./App.css";
import Sprite from "./pages/Sprite";
import ShakeBeer from "./pages/ShakeBeer";
import Admin from "./pages/Admin";
import AuthForm from "./pages/AuthForm";
import OurStory from "./pages/OurStory";
import UserProfile from "./pages/UserProfile";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <CartProvider>
      <Navbar />
      <AgeVerification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/WineStore" element={<WineStore />} />
        <Route path="/Sprite" element={<Sprite />} />
        <Route path="/ShakeBeer" element={<ShakeBeer />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
