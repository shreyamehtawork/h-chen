// src/pages/CategoryPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import FilterSidebar from "../components/FilterSidebar";
import allProducts from "./ProductsData";

function CategoryPage() {
  const { category } = useParams(); // Get category from URL
  const categoryProducts = allProducts.filter((p) => p.category === category);

  const [filters, setFilters] = useState({
    category: [],
    color: [],
    price: { min: 50, max: 175 },
  });

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prev) => {
      if (name === "category" || name === "color") {
        const updatedArray = checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value);
        return { ...prev, [name]: updatedArray };
      } else if (name === "price") {
        return { ...prev, price: value };
      }
      return prev;
    });
  };

  const resetFilters = () => {
    setFilters({ category: [], color: [], price: { min: 50, max: 175 } });
  };

  const filteredProducts = categoryProducts.filter((product) => {
    const matchColor =
      filters.color.length > 0 ? filters.color.includes(product.color) : true;

    const matchPrice =
      product.price >= filters.price.min && product.price <= filters.price.max;

    return matchColor && matchPrice;
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-2">
          <FilterSidebar
            filters={filters}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />
        </div>

        <div className="col-md-9 mx-3">
          <h2 className="mb-2 text-capitalize">{category}</h2>
          <p className="text-muted mb-4 col-md-6">tagline from backend</p>
          <div className="mb-2 fw-bold">{filteredProducts.length} Products</div>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
