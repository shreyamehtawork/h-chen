import React, { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";
import allProducts from "../pages/ProductsData";

function AllProducts() {
  const [filters, setFilters] = useState({
    category: [],
    color: [],
    price: { min: 50, max: 175 },
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({ category: [], color: [], price: { min: 50, max: 175 } });
  };

  const filteredProducts = allProducts.filter((product) => {
    const inCategory =
      filters.category.length === 0 ||
      filters.category.includes(product.category);

    const inColor =
      filters.color.length === 0 || filters.color.includes(product.color);

    const inPriceRange =
      product.price >= filters.price.min && product.price <= filters.price.max;

    return inCategory && inColor && inPriceRange;
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <FilterSidebar
            filters={filters}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />
        </div>

        <div className="col-md-9">
          <h2 className="mb-2 text-capitalize">All Products</h2>
          <p className="text-muted mb-4 col-md-6">tagline from backend</p>
          <div className="mb-2 fw-bold">{filteredProducts.length} Products</div>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
