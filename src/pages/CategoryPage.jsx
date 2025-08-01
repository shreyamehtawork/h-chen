// src/pages/CategoryPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import image1 from "../assets/images/infants/image1.jpg";
import image2 from "../assets/images/infants/image2.jpg";
import image3 from "../assets/images/infants/image3.jpg";
// import image4 from "../assets/images/infants/image4.jpg";
// import image5 from "../assets/images/infants/image5.jpg";
// import image6 from "../assets/images/infants/image6.jpg";

import men1 from "../assets/images/men/image1.jpg";

import women1 from "../assets/images/women/image1.jpg";
import women2 from "../assets/images/women/image2.jpg";

import FilterSidebar from "../components/FilterSidebar";

import { useState } from "react";

const allProducts = [
  {
    id: 1,
    name: "Clo-Bear 1",
    price: 150,
    image: image1,
    category: "clo-bear",
    size: "M",
    color: "Grey",
  },
  {
    id: 2,
    name: "clo-bear 2",
    price: 130,
    image: image2,
    category: "clo-bear",
    size: "L",
    color: "Grey",
  },
  {
    id: 3,
    name: "clo-bear 3",
    price: 175,
    image: image3,
    category: "clo-bear",
    size: "S",
    color: "Grey",
  },
  {
    id: 4,
    name: "Clo-Prime",
    price: 65,
    image: men1,
    category: "clo-prime",
    size: "L",
    color: "Navy",
  },
  {
    id: 5,
    name: "Clo-Prime",
    price: 65,
    image: men1,
    category: "clo-prime",
    size: "L",
    color: "Black",
  },
  {
    id: 6,
    name: "Clo-Aura",
    price: 65,
    image: women1,
    category: "clo-aura",
    size: "S",
    color: "Beige",
  },
  {
    id: 7,
    name: "Clo-Zion",
    price: 170,
    image: image3,
    category: "clo-zion",
    size: "M",
    color: "Blue",
  },
  {
    id: 8,
    name: "Clo-Aura 2",
    price: 150,
    image: women2,
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
          <div className="mb-2 fw-bold">{filteredProducts.length} Products</div>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
