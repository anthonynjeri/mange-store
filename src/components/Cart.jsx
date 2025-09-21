import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Minus, Trash2, CreditCard, Shield, Truck, ArrowRight, Package, CheckCircle } from "lucide-react";
import { CartContext } from "./CartProvider";
import { loadStripe } from "@stripe/stripe-js";

const stripeKey =
  "pk_test_51KZG2fHrJWQTUDnecxdmO2tjWUEGVNXnC8n2sEvta93pSiW5JyIXiodzfmiyr9acDAzuj6eMdOSEINMwKxGIFXwz002v7e2hNt";

const stripeLoadedPromise = loadStripe(stripeKey);

const Cart = () => {
  const [email, setEmail] = useState("");
  const { cart, handleProductAdd, handleProductDelete } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const priceIds = {
    Tomato: "price_1LzQXeHrJWQTUDneTXS2qSLN",
    Pineapple: "price_1LzQZLHrJWQTUDneAmNHmmVB",
    Cheese: "price_1LvxwrHrJWQTUDneYdA24dvT",
    Milk: "price_1LzQWPHrJWQTUDnew9N4UeJo",
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const lineItems = cart.map((product) => {
      return {
        price: `${priceIds[product.name]}`,
        quantity: product.quantity,
      };
    });
    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: window.location.origin + "/order-confirmation",
          cancelUrl: window.location.origin + "/cart",
          customerEmail: email,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-4 sm:py-6 md:py-8 lg:py-12">
      <motion.div
        className="container-custom"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-900 rounded-xl flex items-center justify-center">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length > 1 ? 's' : ''} ready for checkout`}
              </p>
            </div>
          </div>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            className="text-center py-12 sm:py-16 md:py-20 px-4"
            variants={itemVariants}
          >
            <div className="bg-gray-100 rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <ShoppingBag className="text-gray-400" size={48} />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Your cart is empty
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
              Discover our premium selection of fresh groceries and add them to your cart for a convenient shopping experience.
            </p>
            <Link to="/products">
              <motion.button
                className="bg-primary-900 hover:bg-primary-800 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} />
                <span>Start Shopping</span>
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items - Mobile optimized */}
            <motion.div
              className="lg:col-span-2 space-y-4 sm:space-y-6"
              variants={itemVariants}
            >
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-primary-50 p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Package className="text-primary-600" size={20} />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Your Items</h3>
                    </div>
                    <span className="bg-primary-100 text-primary-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {cart.length} item{cart.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cart.map((product) => (
                    <motion.div
                      key={product.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      layout
                      whileHover={{ x: 2 }}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl shadow-md"
                        />
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary-600 text-white text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
                          {product.quantity}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          ${product.price.toFixed(2)} each
                        </p>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-xs">
                              {i < (product.rating || 4) ? '⭐' : '☆'}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3 w-full sm:w-auto">
                        <div className="flex items-center bg-gray-100 rounded-lg sm:rounded-xl order-2 sm:order-1">
                          <motion.button
                            className="p-2 sm:p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-l-lg sm:rounded-l-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                            onClick={() => handleProductDelete(product.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </motion.button>

                          <span className="w-10 sm:w-12 text-center font-bold text-gray-900 py-2 sm:py-3 text-sm sm:text-base">
                            {product.quantity}
                          </span>

                          <motion.button
                            className="p-2 sm:p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-r-lg sm:rounded-r-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                            onClick={() => handleProductAdd(product)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>

                        <motion.button
                          className="p-2 sm:p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg sm:rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center order-1 sm:order-2 self-end sm:self-auto"
                          onClick={() => {
                            // Remove all quantity of this product
                            for (let i = 0; i < product.quantity; i++) {
                              handleProductDelete(product.id);
                            }
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>

                      <div className="text-left sm:text-right w-full sm:w-auto flex justify-between sm:block">
                        <div className="text-lg sm:text-2xl font-bold text-primary-600">
                          ${(product.price * product.quantity).toFixed(2)}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {product.quantity}x ${product.price.toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100">
                  <Link to="/products">
                    <motion.button
                      className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-2 transition-colors min-h-[44px]"
                      whileHover={{ x: 2 }}
                    >
                      <span>Continue Shopping</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Order Summary - Mobile optimized */}
            <motion.div className="space-y-4 sm:space-y-6" variants={itemVariants}>
              {/* Order Summary Card */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-primary-900 p-4 sm:p-6 text-white">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CreditCard size={20} />
                    <h3 className="text-lg sm:text-xl font-bold">Order Summary</h3>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm sm:text-base text-gray-600">
                      <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base text-gray-600">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Truck size={14} />
                        <span>Delivery Fee</span>
                      </div>
                      <span className="font-semibold text-green-600 flex items-center gap-1">
                        <CheckCircle size={14} />
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base text-gray-600">
                      <span>Estimated Tax</span>
                      <span className="font-semibold">${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-primary-600">${(totalPrice * 1.08).toFixed(2)}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Including all taxes and fees</p>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                        Email Address for Receipt
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-3 sm:px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Shield size={12} />
                        We'll send your receipt and delivery updates securely
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-primary-900 hover:bg-primary-800 text-white text-base sm:text-lg py-3 sm:py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[52px]"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Shield size={18} />
                      <span>Secure Checkout</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </form>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                      <Shield size={14} className="text-green-500" />
                      <span>Secured by <span className="font-semibold text-gray-700">Stripe</span></span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 sm:mt-3">
                      <div className="text-center text-xs text-gray-400">
                        <div className="font-semibold">SSL</div>
                        <div>Encrypted</div>
                      </div>
                      <div className="text-center text-xs text-gray-400">
                        <div className="font-semibold">PCI</div>
                        <div>Compliant</div>
                      </div>
                      <div className="text-center text-xs text-gray-400">
                        <div className="font-semibold">256-bit</div>
                        <div>Security</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info - Mobile responsive */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-4 sm:p-6 border border-green-100">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck className="text-white" size={16} />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-green-900">
                    Fast & Fresh Delivery
                  </h4>
                </div>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-green-800">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={14} />
                    <span>Same-day delivery available (order by 2 PM)</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={14} />
                    <span>100% fresh guarantee or money back</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0" size={14} />
                    <span>Temperature-controlled vehicles</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
