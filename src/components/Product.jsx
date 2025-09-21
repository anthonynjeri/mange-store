import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { CartContext } from "./CartProvider";

const Product = ({ details, viewMode = "grid" }) => {
  const { id } = details;
  const { handleProductAdd, handleProductDelete, cart } =
    useContext(CartContext);

  const productFromCart = cart.find((product) => product.id === id);
  const quantity = productFromCart ? productFromCart.quantity : 0;

  if (viewMode === "list") {
    return (
      <motion.div
        className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 h-full group hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Product Image - Mobile optimized */}
          <div className="relative overflow-hidden rounded-xl sm:w-40 md:w-48 sm:h-40 md:h-48 flex-shrink-0">
            <Link to={`/products/${id}`}>
              <img
                src={details.image}
                alt={details.name}
                className="w-full h-40 sm:h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Quantity Badge - Mobile touch-friendly */}
            {quantity > 0 && (
              <motion.div
                className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-primary-600 text-white text-xs sm:text-sm font-semibold w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {quantity}
              </motion.div>
            )}

          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2 sm:gap-0">
                <div className="flex-1">
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 sm:px-3 py-1 rounded-full mb-2">
                    {details.category || 'Grocery'}
                  </span>
                  <Link to={`/products/${id}`}>
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                      {details.name}
                    </h3>
                  </Link>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xl sm:text-2xl font-bold text-primary-600">
                    ${details.price}
                  </div>
                  {details.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      ${details.originalPrice}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-2 text-sm sm:text-base">
                {details.description}
              </p>

            </div>

            {/* Actions - Mobile stacked */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="flex items-center gap-2">
                {quantity > 0 && (
                  <motion.button
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    onClick={() => handleProductDelete(id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Remove from cart"
                    aria-label="Remove from cart"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                )}

                <motion.button
                  className="bg-primary-900 hover:bg-primary-800 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px] flex-1 sm:flex-initial justify-center"
                  onClick={() => handleProductAdd(details)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={18} />
                  <span className="text-sm sm:text-base">{quantity > 0 ? 'Add More' : 'Add to Cart'}</span>
                </motion.button>
              </div>

              <Link
                to={`/products/${id}`}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors text-center sm:text-left text-sm sm:text-base"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-100 p-0 h-full group hover:shadow-xl transition-all duration-300 overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/products/${id}`}>
          <img
            src={details.image}
            alt={details.name}
            className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Quantity Badge - Mobile responsive */}
        {quantity > 0 && (
          <motion.div
            className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-primary-600 text-white text-xs sm:text-sm font-bold w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {quantity}
          </motion.div>
        )}

        {/* Category Badge - Mobile responsive */}
        <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-full shadow-sm">
          {details.category || 'Grocery'}
        </div>


        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info - Mobile optimized */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/products/${id}`}>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 line-clamp-2 hover:text-primary-600 transition-colors group-hover:text-primary-600">
              {details.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
            {details.description}
          </p>

        </div>

        {/* Price - Mobile responsive */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-baseline gap-1 sm:gap-2 mb-2 flex-wrap">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
              ${details.price}
            </span>
            {details.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ${details.originalPrice}
              </span>
            )}
            {details.originalPrice && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                {Math.round((1 - details.price / details.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Actions - Mobile optimized */}
        <div className="space-y-2 sm:space-y-3">
          {/* Quantity Controls - Touch-friendly */}
          {quantity > 0 && (
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2 sm:p-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">In Cart:</span>
              <div className="flex items-center gap-2">
                <motion.button
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-red-50"
                  onClick={() => handleProductDelete(id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </motion.button>
                <span className="font-bold text-primary-600 min-w-[2rem] text-center text-sm sm:text-base">{quantity}</span>
                <motion.button
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-primary-50"
                  onClick={() => handleProductAdd(details)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </div>
          )}

          {/* Add to Cart Button - Touch-friendly */}
          <motion.button
            className="w-full bg-primary-900 hover:bg-primary-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px]"
            onClick={() => handleProductAdd(details)}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingCart size={18} />
            <span className="text-sm sm:text-base">{quantity > 0 ? 'Add More' : 'Add to Cart'}</span>
          </motion.button>

          {/* Quick Actions */}
          <div className="flex items-center justify-center pt-1 sm:pt-2">
            <Link
              to={`/products/${id}`}
              className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium transition-colors min-h-[44px] flex items-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
