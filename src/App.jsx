import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import About from "./components/About";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import OrderConfirmation from "./components/OrderConfirmation";
import { CartProvider } from "./components/CartProvider";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <motion.main
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/products/:id/nutrition" element={<ProductDetails />} />
              <Route path="/products/:id/storage" element={<ProductDetails />} />
            </Routes>
          </motion.main>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
