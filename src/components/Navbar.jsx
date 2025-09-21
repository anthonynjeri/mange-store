import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X, Home, Info, Grid3x3 } from "lucide-react";
import { CartContext } from "./CartProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const cartQuantity = cart.reduce((sum, product) => {
    return sum + product.quantity;
  }, 0);

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, y: -10 },
    open: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.nav
      className="bg-cream-50 shadow-lg sticky top-0 z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo - Mobile optimized */}
          <NavLink to="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-900 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-900">FreshMart</span>
              <span className="text-xs text-primary-500 -mt-1 hidden sm:block">Premium Grocery</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 font-medium transition-all duration-200 hover:text-primary-600 hover:scale-105 ${
                  isActive ? 'text-primary-600' : 'text-primary-700'
                }`
              }
            >
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-2 font-medium transition-all duration-200 hover:text-primary-600 hover:scale-105 ${
                  isActive ? 'text-primary-600' : 'text-primary-700'
                }`
              }
            >
              <Info size={18} />
              <span>About</span>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center space-x-2 font-medium transition-all duration-200 hover:text-primary-600 hover:scale-105 ${
                  isActive ? 'text-primary-600' : 'text-primary-700'
                }`
              }
            >
              <Grid3x3 size={18} />
              <span>Products</span>
            </NavLink>
            <NavLink to="/cart">
              <motion.button
                className="relative bg-primary-900 hover:bg-primary-800 text-white px-6 py-2.5 rounded-full font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
                {cartQuantity > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {cartQuantity}
                  </motion.span>
                )}
              </motion.button>
            </NavLink>
          </div>

          {/* Mobile menu button - Enhanced touch target */}
          <motion.button
            className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-600" />
            ) : (
              <Menu size={24} className="text-gray-600" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation - Enhanced touch targets */}
        <motion.div
          className="md:hidden overflow-hidden"
          variants={mobileMenuVariants}
          animate={isMenuOpen ? "open" : "closed"}
          initial="closed"
        >
          <div className="py-4 space-y-2 border-t border-gray-200">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-3 py-4 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 min-h-[44px] ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-primary-700'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} />
              <span className="text-base">Home</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-3 py-4 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 min-h-[44px] ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-primary-700'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={20} />
              <span className="text-base">About</span>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center space-x-3 py-4 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 min-h-[44px] ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-primary-700'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <Grid3x3 size={20} />
              <span className="text-base">Products</span>
            </NavLink>
            <NavLink to="/cart" onClick={() => setIsMenuOpen(false)} className="mt-4 block">
              <motion.button
                className="w-full relative bg-primary-900 hover:bg-primary-800 text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 shadow-lg min-h-[48px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart size={20} />
                <span className="text-base">Cart</span>
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    {cartQuantity}
                  </span>
                )}
              </motion.button>
            </NavLink>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
