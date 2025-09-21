import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Truck, Star, Clock, Shield } from "lucide-react";
import groceryStoreimg from "../assets/images/pexels-conojeghuo-375897.jpg";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero Section - Mobile First */}
      <motion.div
        className="container-custom py-8 sm:py-12 md:py-16 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          <motion.div className="space-y-6 md:space-y-8" variants={itemVariants}>
            <div>
              <motion.div className="mb-4" variants={itemVariants}>
                <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 text-sm font-semibold rounded-full">
                  ✨ Premium Quality Guaranteed
                </span>
              </motion.div>
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-primary-900 leading-tight"
                variants={itemVariants}
              >
                Fresh Groceries
                <span className="text-primary-900"> Delivered</span>
                <br />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-primary-700">to Your Doorstep</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-primary-700 mt-4 md:mt-6 leading-relaxed"
                variants={itemVariants}
              >
                Experience the convenience of premium grocery shopping from home. Our expertly curated selection of fresh produce, organic items, and everyday essentials are sourced from trusted suppliers and delivered with care.
              </motion.p>
            </div>

            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4" variants={itemVariants}>
              <Link to="/products" className="w-full sm:w-auto">
                <motion.button
                  className="bg-primary-900 hover:bg-primary-800 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 w-full min-h-[48px] group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={20} />
                  <span>Start Shopping</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <motion.button
                  className="border-2 border-primary-200 hover:border-primary-300 text-primary-700 hover:text-primary-800 bg-cream-50 hover:bg-cream-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 w-full min-h-[48px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats - Mobile optimized */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-6 md:pt-8 border-t border-neutral-200"
              variants={itemVariants}
            >
              <motion.div
                className="text-center p-3 sm:p-4 rounded-xl bg-cream-50/80 backdrop-blur-sm border border-neutral-200"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-900">1000+</div>
                <div className="text-xs sm:text-sm text-primary-600 font-medium">Premium Products</div>
              </motion.div>
              <motion.div
                className="text-center p-3 sm:p-4 rounded-xl bg-cream-50/80 backdrop-blur-sm border border-neutral-200"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-900">30min</div>
                <div className="text-xs sm:text-sm text-primary-600 font-medium">Fast Delivery</div>
              </motion.div>
              <motion.div
                className="text-center p-3 sm:p-4 rounded-xl bg-cream-50/80 backdrop-blur-sm border border-neutral-200"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-900">100%</div>
                <div className="text-xs sm:text-sm text-primary-600 font-medium">Fresh Guarantee</div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            variants={imageVariants}
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
              <img
                src={groceryStoreimg}
                alt="Fresh groceries"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              {/* Trust badges overlay - Mobile responsive */}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Shield className="text-green-600" size={16} />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Star className="text-yellow-500" size={16} />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">5-Star Quality</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards - Mobile responsive */}
            <motion.div
              className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 bg-gradient-to-br from-white to-primary-50 p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm hidden sm:block"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🥬</div>
              <div className="text-xs font-bold text-gray-700">Organic Vegetables</div>
              <div className="text-xs text-green-600 font-semibold">Farm Fresh</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-gradient-to-br from-white to-accent-50 p-3 sm:p-4 md:p-5 rounded-xl md:rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm hidden sm:block"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -2, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🍎</div>
              <div className="text-xs font-bold text-gray-700">Premium Fruits</div>
              <div className="text-xs text-red-600 font-semibold">Hand Picked</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section - Mobile first */}
      <motion.div
        className="bg-neutral-50 py-12 sm:py-16 md:py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-3 sm:px-4 py-2 bg-orange-100 text-orange-800 text-sm font-semibold rounded-full mb-4">
                🌟 Why Choose Us
              </span>
            </motion.div>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              The FreshMart <span className="text-primary-900">Advantage</span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Experience the difference with our commitment to quality, speed, and customer satisfaction. Every product is carefully selected to meet our premium standards.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Truck,
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                title: "Lightning Fast Delivery",
                description: "Express delivery in 30 minutes or less, guaranteed fresh",
                features: ["Real-time tracking", "Temperature controlled", "Contact-free delivery"]
              },
              {
                icon: Star,
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50",
                title: "Premium Quality",
                description: "Handpicked produce from trusted farms and suppliers",
                features: ["Quality guarantee", "Fresh daily", "Expert curation"]
              },
              {
                icon: Shield,
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
                title: "Secure & Trusted",
                description: "Safe payments and reliable service you can count on",
                features: ["Secure payments", "Money-back guarantee", "24/7 support"]
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden bg-cream-50 rounded-xl md:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 group`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r ${feature.color} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary-900 mb-2 sm:mb-3">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-primary-600 mb-4 sm:mb-6 leading-relaxed">{feature.description}</p>

                    <div className="space-y-1 sm:space-y-2">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center justify-center text-xs sm:text-sm text-primary-500">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Call to Action - Mobile optimized */}
      <motion.div
        className="bg-primary-900 py-12 sm:py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom text-center">
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Experience Premium Grocery Shopping?
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join thousands of satisfied customers who trust FreshMart for their daily grocery needs.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/products" className="w-full sm:w-auto">
              <motion.button
                className="bg-cream-50 text-forest-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-cream-100 transition-colors duration-300 flex items-center justify-center space-x-2 w-full min-h-[48px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={20} />
                <span>Start Shopping Now</span>
              </motion.button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <motion.button
                className="border-2 border-cream-50 text-cream-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-cream-50 hover:text-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 w-full min-h-[48px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Learn Our Story</span>
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
