import React, { useState } from "react";
import ProductList from "../components/ProductList";
import FilterSidebar from "../components/FilterSidebar";
import hat1 from "../assets/hat1.avif";
import hat2 from "../assets/hat2.avif";
import hat3 from "../assets/hat3.avif";
import hat4 from "../assets/hat4.avif";
import hat5 from "../assets/hat5.avif";
import hat6 from "../assets/hat6.avif";
import hat7 from "../assets/hat7.avif";
import hat8 from "../assets/hat8.avif";

function ShopAll() {
  const products = [
    {
      id: 1,
      name: "Clo-Aura 1",
      price: 150,
      image: hat1,
      category: "clo-aura",
      size: "M",
      color: "Grey",
    },
    {
      id: 2,
      name: "Clo-Prime 1",
      price: 130,
      image: hat2,
      category: "clo-prime",
      size: "L",
      color: "Grey",
    },
    {
      id: 3,
      name: "Clo-Pixie",
      price: 175,
      image: hat3,
      category: "clo-pixie",
      size: "S",
      color: "Grey",
    },
    {
      id: 4,
      name: "clo-zion 1",
      price: 65,
      image: hat4,
      category: "clo-zion",
      size: "L",
      color: "Navy",
    },
    {
      id: 5,
      name: "Clo-Bear1",
      price: 65,
      image: hat5,
      category: "clo-bear",
      size: "L",
      color: "Black",
    },
    {
      id: 6,
      name: "Clo-Bear2",
      price: 65,
      image: hat6,
      category: "clo-bear",
      size: "S",
      color: "Beige",
    },
    {
      id: 7,
      name: "Clo-Zion",
      price: 170,
      image: hat7,
      category: "clo-zion",
      size: "M",
      color: "Blue",
    },
    {
      id: 8,
      name: "Clo-AUra2",
      price: 150,
      image: hat8,
      category: "clo-aura",
      size: "L",
      color: "Grey",
    },
  ];

  return (
    <div className="mt-5 row">
      <div className="col-md-2 container">
        <FilterSidebar
          filters={filters}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />
      </div>
      <div className="col-md-9">
        <h2 className="mb-2">All Products</h2>
        <p className="text-muted mb-4 col-md-6">
          This is your category description. It’s a great place to tell
          customers what this category is about.
        </p>
        <div className="row">
          <div className="col-md-6 fw-bold">
            {filteredProducts.length} Products
          </div>
        </div>
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}

export default ShopAll;
