// src/pages/CategoryPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import hat1 from "../assets/hat1.avif";
import hat2 from "../assets/hat2.avif";
import hat3 from "../assets/hat3.avif";
import hat4 from "../assets/hat4.avif";
import hat5 from "../assets/hat5.avif";
import hat6 from "../assets/hat6.avif";
import hat7 from "../assets/hat7.avif";
import hat8 from "../assets/hat8.avif";
import FilterSidebar from "../components/FilterSidebar";

import { useState } from "react";

const allProducts = [
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
    name: "Clo-Zion 1",
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
    name: "Clo-Aura 2",
    price: 150,
    image: hat8,
    category: "clo-aura",
    size: "L",
    color: "Grey",
  },
];

function CategoryPage() {
  const { category } = useParams(); // Get category from URL
  const filtered = allProducts.filter((p) => p.category == category);

  const [filters, setFilters] = useState({
    category: [],
    color: [],
    price: { min: 50, max: 175 }, // default range
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
        return { ...prev, price: value }; // value is an object { min, max }
      }
      return prev;
    });
  };

  const resetFilters = () => {
    setFilters({ category: [], color: [], price: { min: 50, max: 175 } });
  };
  const categoryProducts = allProducts.filter((p) => p.category === category);

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
          <div className="mb-2 fw-bold">{filtered.length} Products</div>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
