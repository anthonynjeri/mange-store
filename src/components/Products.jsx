import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid3x3, List, ChevronDown } from "lucide-react";
import Product from "./Product";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const { get, loading } = useFetch(
    "https://react-tutorial-demo.firebaseio.com/"
  );

  useEffect(() => {
    get("supermarket.json")
      .then((data) => {
        setProductsData(data);
        setFilteredProducts(data);
      })
      .catch((error) =>
        console.log(`There was an error fetching the data ${error}`)
      );
  }, [get]);

  useEffect(() => {
    try {
      // Only process if we have products data
      if (!productsData || productsData.length === 0) {
        setFilteredProducts([]);
        return;
      }

      // Ensure productsData is an array and has valid items
      const validProducts = Array.isArray(productsData)
        ? productsData.filter(product => product && typeof product === 'object')
        : [];

      let filtered = [...validProducts];

      if (searchTerm && searchTerm.trim()) {
        filtered = filtered.filter(product => {
          const title = product?.title || product?.name || "";
          return typeof title === 'string' && title.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }

      if (selectedCategory !== "all") {
        filtered = filtered.filter(product => {
          const category = product?.category;
          return category && category === selectedCategory;
        });
      }

      // Sort products
      filtered.sort((a, b) => {
        if (!a || !b) return 0;

        switch (sortBy) {
          case "name":
            const titleA = a?.title || a?.name || "";
            const titleB = b?.title || b?.name || "";
            return titleA.localeCompare(titleB);
          case "price-low":
            return (Number(a?.price) || 0) - (Number(b?.price) || 0);
          case "price-high":
            return (Number(b?.price) || 0) - (Number(a?.price) || 0);
          case "popularity":
            return (Number(b?.rating) || 0) - (Number(a?.rating) || 0);
          default:
            return 0;
        }
      });

      setFilteredProducts(filtered);
    } catch (error) {
      console.error("Error processing products data:", error);
      setFilteredProducts([]);
    }
  }, [productsData, searchTerm, selectedCategory, sortBy]);

  const categories = useMemo(() => {
    try {
      if (!productsData || !Array.isArray(productsData)) {
        return ["all"];
      }

      const uniqueCategories = new Set();
      productsData.forEach(product => {
        if (product && product.category && typeof product.category === 'string') {
          uniqueCategories.add(product.category);
        }
      });

      return ["all", ...Array.from(uniqueCategories)];
    } catch (error) {
      console.error("Error generating categories:", error);
      return ["all"];
    }
  }, [productsData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <div className="container-custom py-6 sm:py-8 lg:py-12">
        {/* Header - Mobile optimized */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 sm:mb-4">
            <span className="inline-flex items-center px-3 sm:px-4 py-2 bg-orange-100 text-orange-800 text-sm font-semibold rounded-full">
              🛒 Premium Collection
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-primary-900 mb-4 sm:mb-6 px-4">
            Our <span className="text-primary-900">Premium</span> Products
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover our carefully curated selection of fresh groceries, organic produce, and premium products sourced from trusted suppliers worldwide.
          </p>
        </motion.div>

        {/* Search and Filters - Mobile first */}
        <motion.div
          className="bg-cream-50 rounded-xl md:rounded-2xl shadow-lg border border-neutral-200 p-4 sm:p-6 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Search */}
            <div className="w-full">
              <label htmlFor="search" className="block text-sm font-medium text-primary-700 mb-2">Search Products</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Search className="text-primary-400" size={18} />
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 bg-cream-100 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-200 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters Row - Mobile stacked */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <div className="flex-1">
                <label htmlFor="category" className="block text-sm font-medium text-primary-700 mb-2">Category</label>
                <div className="relative">
                  <select
                    id="category"
                    className="w-full appearance-none bg-cream-100 border border-neutral-300 rounded-xl px-3 sm:px-4 py-3 pr-8 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-200 text-base"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => {
                      const displayName = category === "all"
                        ? "All Categories"
                        : (category && typeof category === 'string' && category.length > 0)
                          ? category.charAt(0).toUpperCase() + category.slice(1)
                          : String(category || 'Unknown');

                      return (
                        <option key={category || 'unknown'} value={category}>
                          {displayName}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" size={16} />
                </div>
              </div>

              {/* Sort Filter */}
              <div className="flex-1">
                <label htmlFor="sort" className="block text-sm font-medium text-primary-700 mb-2">Sort By</label>
                <div className="relative">
                  <select
                    id="sort"
                    className="w-full appearance-none bg-cream-100 border border-neutral-300 rounded-xl px-3 sm:px-4 py-3 pr-8 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-all duration-200 text-base"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle and Results Count - Mobile optimized */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100 gap-3 sm:gap-0">
            <div className="flex items-center space-x-1 bg-neutral-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 sm:p-3 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  viewMode === "grid" ? "bg-cream-50 text-primary-600 shadow-sm" : "text-primary-500 hover:text-primary-700"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 sm:p-3 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  viewMode === "list" ? "bg-cream-50 text-primary-600 shadow-sm" : "text-primary-500 hover:text-primary-700"
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>

            {!loading && (
              <div className="text-xs sm:text-sm text-primary-600">
                Showing <span className="font-semibold text-primary-900">{filteredProducts.length}</span> of <span className="font-semibold text-primary-900">{productsData.length}</span> products
              </div>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <motion.div
            className={`grid gap-4 sm:gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  layout
                  transition={{ duration: 0.3 }}
                >
                  <Product details={product} viewMode={viewMode} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12 sm:py-16 md:py-20 px-4"
                variants={itemVariants}
              >
                <div className="bg-neutral-200 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Search className="text-primary-400" size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-primary-900 mb-2">No products found</h3>
                <p className="text-sm sm:text-base text-primary-600 mb-4 sm:mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-primary-900 text-white px-6 py-3 rounded-xl hover:bg-primary-800 transition-colors min-h-[48px]"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Pagination or Load More - Mobile optimized */}
        {!loading && filteredProducts.length > 12 && (
          <motion.div
            className="text-center mt-8 sm:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="bg-primary-900 text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl min-h-[48px] w-full sm:w-auto max-w-xs">
              Load More Products
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
