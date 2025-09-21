import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import aboutImg from "../assets/images/pexels-delimoges-4935599.jpg";

const About = () => {
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

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Fresh Products" },
    { number: "50+", label: "Store Locations" },
    { number: "24/7", label: "Customer Support" }
  ];

  const features = [
    {
      icon: "🌱",
      title: "Farm Fresh Quality",
      description: "Direct sourcing from local farms ensures the freshest produce reaches your table."
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Same-day delivery available in most areas. Your groceries, delivered fresh and fast."
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Competitive pricing with regular discounts and seasonal offers for all customers."
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      description: "Safe and secure payment processing powered by Stripe for your peace of mind."
    }
  ];

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero Section - Mobile first */}
      <motion.div
        className="bg-cream-100 py-8 sm:py-12 md:py-16 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            <motion.div className="space-y-6 sm:space-y-8" variants={itemVariants}>
              <div>
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-primary-900 leading-tight mb-4 sm:mb-6"
                  variants={itemVariants}
                >
                  About <span className="text-primary-600">FreshMart</span>
                </motion.h1>
                <motion.p
                  className="text-base sm:text-lg md:text-xl text-primary-600 leading-relaxed mb-4 sm:mb-6"
                  variants={itemVariants}
                >
                  We're revolutionizing the way you shop for groceries. Since our founding, we've been committed to bringing you the freshest produce and highest quality products, delivered straight to your doorstep.
                </motion.p>
                <motion.p
                  className="text-sm sm:text-base md:text-lg text-primary-600 leading-relaxed"
                  variants={itemVariants}
                >
                  Our mission is simple: make grocery shopping convenient, affordable, and sustainable. With a focus on local sourcing and community support, we're not just a grocery store – we're your neighborhood partner in healthy living.
                </motion.p>
              </div>

              {/* Stats - Mobile responsive */}
              <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-neutral-200"
                variants={itemVariants}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-primary-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative lg:order-2 mt-8 lg:mt-0"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl">
                <img
                  src={aboutImg}
                  alt="Fresh groceries and produce"
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Floating Badge - Mobile responsive */}
              <motion.div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-cream-50 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600">100%</div>
                  <div className="text-xs sm:text-sm font-medium text-primary-600">Fresh Guarantee</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section - Mobile responsive */}
      <motion.div
        className="bg-cream-50 py-12 sm:py-16 lg:py-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 mb-3 sm:mb-4 px-4">
              Why Choose FreshMart?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-primary-600 max-w-2xl mx-auto px-4">
              We're committed to providing an exceptional grocery shopping experience that prioritizes quality, convenience, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card text-center p-5 sm:p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-primary-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Payment Security Section - Mobile responsive */}
      <motion.div
        className="bg-primary-900 py-12 sm:py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom text-center">
          <motion.div
            className="max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🔒</div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              Secure & Trusted Payments
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-cream-100 mb-6 sm:mb-8 leading-relaxed">
              Your payment information is protected with industry-leading security.
              We use <span className="font-semibold text-white">Stripe</span> for all transactions,
              ensuring your data is safe and secure.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg">🛡️</span>
                <span className="text-sm sm:text-base">SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg">✓</span>
                <span className="text-sm sm:text-base">PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg">🏦</span>
                <span className="text-sm sm:text-base">Bank-level Security</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Call to Action - Mobile responsive */}
      <motion.div
        className="bg-neutral-100 py-12 sm:py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-900 mb-3 sm:mb-4 px-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-primary-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of satisfied customers who trust FreshMart for their grocery needs.
          </p>
          <motion.a
            href="/products"
            className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center space-x-2 min-h-[48px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={18} />
            <span>Start Shopping Now</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
