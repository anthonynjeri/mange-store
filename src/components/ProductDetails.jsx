import React, { useEffect, useState, useContext } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Share2, Star, ChevronRight, Shield, Truck, RotateCcw } from "lucide-react";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader.jsx";
import ProductDetailStorage from "./ProductDetailStorage.jsx";
import ProductDetailNutrition from "./ProductDetailNutrition.jsx";
import ProductDetailInfo from "./ProductDetailInfo.jsx";
import { CartContext } from "./CartProvider";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const params = useParams();
  const location = useLocation();
  const { id } = params;
  const { handleProductAdd, cart } = useContext(CartContext);

  const { get, loading } = useFetch(
    "https://react-tutorial-demo.firebaseio.com/"
  );

  useEffect(() => {
    get(`productinfo/id${id}.json`)
      .then((data) => setProductDetails(data))
      .catch((error) => console.log(error));
  }, [id, get]);

  const productFromCart = cart.find((product) => product.id === id);
  const quantity = productFromCart ? productFromCart.quantity : 0;

  const tabs = [
    { name: "Details", path: "" },
    { name: "Nutrition", path: "nutrition" },
    { name: "Storage", path: "storage" }
  ];

  const getCurrentTab = () => {
    if (location.pathname.includes('/nutrition')) return 'nutrition';
    if (location.pathname.includes('/storage')) return 'storage';
    return '';
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <Loader size="large" />
          <p className="text-gray-600 mt-4 text-base sm:text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <motion.div
        className="container-custom py-4 sm:py-6 md:py-8 lg:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Breadcrumb - Mobile responsive */}
        <motion.nav className="mb-6 sm:mb-8" variants={itemVariants}>
          <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
            <li className="flex-shrink-0">
              <Link to="/" className="hover:text-primary-600 transition-colors flex items-center space-x-1">
                <span>Home</span>
              </Link>
            </li>
            <li className="flex items-center flex-shrink-0">
              <ChevronRight size={14} className="text-gray-400" />
              <Link to="/products" className="hover:text-primary-600 transition-colors ml-1 sm:ml-2">
                Products
              </Link>
            </li>
            <li className="flex items-center min-w-0">
              <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
              <span className="text-gray-900 font-semibold ml-1 sm:ml-2 truncate">{productDetails.name}</span>
            </li>
          </ol>
        </motion.nav>

        {/* Product Header - Mobile first */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12"
          variants={itemVariants}
        >
          {/* Product Image - Mobile optimized */}
          <div className="relative order-1 lg:order-1">
            <motion.div
              className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={productDetails.image}
                alt={productDetails.name}
                className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg md:rounded-xl"
              />

              {/* Quick Actions Overlay - Mobile visible */}
              <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 flex flex-col gap-2 sm:gap-3">
                <motion.button
                  className="p-2 sm:p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 border border-white/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Add to favorites"
                  aria-label="Add to favorites"
                >
                  <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
                </motion.button>
                <motion.button
                  className="p-2 sm:p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 border border-white/50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Share product"
                  aria-label="Share product"
                >
                  <Share2 size={18} className="text-gray-600 hover:text-blue-500 transition-colors" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Product Info - Mobile optimized */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-primary-100 text-primary-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full">
                  {productDetails.category || 'Grocery'}
                </span>
                {quantity > 0 && (
                  <motion.span
                    className="bg-accent-100 text-accent-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {quantity} in cart
                  </motion.span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {productDetails.name}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < (productDetails.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600 font-medium">
                  {(productDetails.rating || 4).toFixed(1)} ({productDetails.reviews || 127} reviews)
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full w-fit">
                  Top Rated
                </span>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                {productDetails.description}
              </p>
            </div>

            {/* Price and Actions - Mobile responsive */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600">
                  ${productDetails.price}
                </span>
                {productDetails.originalPrice && (
                  <span className="text-base sm:text-lg md:text-xl text-gray-500 line-through">
                    ${productDetails.originalPrice}
                  </span>
                )}
                {productDetails.originalPrice && (
                  <span className="bg-red-100 text-red-800 text-xs sm:text-sm font-medium px-2 py-1 rounded">
                    {Math.round((1 - productDetails.price / productDetails.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <motion.button
                className="w-full bg-primary-900 hover:bg-primary-800 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[52px]"
                onClick={() => handleProductAdd(productDetails)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                <span>{quantity > 0 ? 'Add More to Cart' : 'Add to Cart'}</span>
                {quantity > 0 && (
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs sm:text-sm">
                    +{quantity}
                  </span>
                )}
              </motion.button>

              {/* Product Features - Mobile stacked */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-blue-50 rounded-lg sm:rounded-xl p-2 sm:p-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="text-blue-600" size={14} />
                  </div>
                  <div>
                    <div className="font-semibold">Fresh Guarantee</div>
                    <div className="text-xs text-gray-500">100% quality assured</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-purple-50 rounded-lg sm:rounded-xl p-2 sm:p-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="text-purple-600" size={14} />
                  </div>
                  <div>
                    <div className="font-semibold">Easy Returns</div>
                    <div className="text-xs text-gray-500">30-day return policy</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 bg-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="text-orange-600" size={14} />
                  </div>
                  <div>
                    <div className="font-semibold">Secure Payment</div>
                    <div className="text-xs text-gray-500">SSL encrypted checkout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs - Mobile responsive */}
        <motion.div className="bg-white rounded-lg md:rounded-xl shadow-sm" variants={itemVariants}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 px-4 sm:px-6 overflow-x-auto">
              {tabs.map((tab) => {
                const isActive = getCurrentTab() === tab.path;
                return (
                  <NavLink
                    key={tab.name}
                    to={tab.path ? `/products/${id}/${tab.path}` : `/products/${id}`}
                    className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors min-h-[44px] flex items-center ${
                      isActive
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {getCurrentTab() === 'nutrition' && (
              <ProductDetailNutrition nutrition={productDetails.nutrition} />
            )}
            {getCurrentTab() === 'storage' && (
              <ProductDetailStorage storage={productDetails.storage} />
            )}
            {getCurrentTab() === '' && (
              <ProductDetailInfo details={productDetails} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ProductDetails;
