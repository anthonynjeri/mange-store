import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  Truck,
  Calendar,
  Clock,
  ArrowRight,
  Star
} from "lucide-react";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);

  // Generate order number and details
  useEffect(() => {
    const orderNumber = `FM${Date.now().toString().slice(-8)}`;
    const orderDate = new Date();
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);

    // Mock order details - in a real app, you'd fetch this from your backend
    setOrderDetails({
      orderNumber,
      orderDate: orderDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      estimatedDelivery: estimatedDelivery.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      total: searchParams.get('total') || '0.00',
      email: searchParams.get('email') || 'customer@example.com',
      deliveryAddress: "123 Main Street, City, State 12345"
    });
  }, [searchParams]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: 0.2
      }
    }
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
        <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-6 sm:py-8 lg:py-12">
      <motion.div
        className="container-custom"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Header - Mobile optimized */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 px-4"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-4 sm:mb-6"
            variants={iconVariants}
          >
            <CheckCircle className="text-green-600" size={40} />
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-3 sm:mb-4"
            variants={itemVariants}
          >
            Order Confirmed! 🎉
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-primary-600 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Thank you for your order! We've received your payment and are preparing your fresh groceries for delivery.
          </motion.p>
        </motion.div>

        {/* Delivery Info - Mobile responsive */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
          <motion.div
            className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-neutral-200 overflow-hidden"
            variants={itemVariants}
          >
            <div className="bg-green-600 p-4 sm:p-6 text-white">
              <div className="flex items-center gap-2 sm:gap-3">
                <Truck size={20} />
                <h3 className="text-lg sm:text-xl font-bold">Delivery Information</h3>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Calendar className="text-green-600 mt-1 flex-shrink-0" size={16} />
                <div>
                  <span className="text-gray-600 block text-sm sm:text-base">Estimated Delivery</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{orderDetails.estimatedDelivery}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <Clock className="text-blue-600 mt-1 flex-shrink-0" size={16} />
                <div>
                  <span className="text-gray-600 block text-sm sm:text-base">Delivery Window</span>
                  <span className="font-semibold text-sm sm:text-base">9:00 AM - 6:00 PM</span>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <div className="bg-green-50 rounded-lg p-2 sm:p-3">
                  <div className="flex items-center gap-2 text-green-700">
                    <Truck size={14} />
                    <span className="font-semibold text-xs sm:text-sm">Free Same-Day Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        {/* What's Next - Mobile responsive */}
        <motion.div
          className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-neutral-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 mx-4"
          variants={itemVariants}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-900 mb-4 sm:mb-6 text-center">
            What happens next?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Package className="text-orange-600" size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Order Processing</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                We're carefully selecting and packaging your fresh groceries
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Truck className="text-blue-600" size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Out for Delivery</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Your order will be dispatched and you'll receive tracking details
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Delivered Fresh</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Enjoy your fresh groceries delivered right to your doorstep
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions - Mobile responsive */}
        <motion.div
          className="flex justify-center px-4"
          variants={itemVariants}
        >
          <Link to="/products" className="w-full sm:w-auto max-w-xs sm:max-w-none">
            <motion.button
              className="bg-primary-900 hover:bg-primary-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 w-full min-h-[48px]"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Package size={18} />
              <span className="text-sm sm:text-base">Continue Shopping</span>
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer Message - Mobile responsive */}
        <motion.div
          className="text-center mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-neutral-200 px-4"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
            <Star className="text-yellow-400 fill-current" size={16} />
            <Star className="text-yellow-400 fill-current" size={16} />
            <Star className="text-yellow-400 fill-current" size={16} />
            <Star className="text-yellow-400 fill-current" size={16} />
            <Star className="text-yellow-400 fill-current" size={16} />
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Thank you for choosing <span className="font-bold text-primary-900">FreshMart</span>!
            We're committed to delivering the freshest groceries to your doorstep.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;