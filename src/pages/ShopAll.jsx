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
      name: "Premium Felt Fedora",
      price: 150,
      image: hat1,
      category: "Contempory",
      size: "M",
      color: "Grey",
    },
    {
      id: 2,
      name: "Handcrafted Boater Hat",
      price: 130,
      image: hat2,
      category: "Contempory",
      size: "L",
      color: "Grey",
    },
    {
      id: 3,
      name: "Leather Cowboy Hat",
      price: 175,
      image: hat3,
      category: "Contempory",
      size: "S",
      color: "Grey",
    },
    {
      id: 4,
      name: "Wool Newsboy Cap",
      price: 65,
      image: hat4,
      category: "Classic",
      size: "L",
      color: "Navy",
    },
    {
      id: 5,
      name: "Wool Newsboy Cap",
      price: 65,
      image: hat5,
      category: "Classic",
      size: "L",
      color: "Black",
    },
    {
      id: 6,
      name: "Wool Newsboy Cap",
      price: 65,
      image: hat6,
      category: "Classic",
      size: "S",
      color: "Beige",
    },
    {
      id: 7,
      name: "Wool Newsboy Cap",
      price: 170,
      image: hat7,
      category: "Premium",
      size: "M",
      color: "Blue",
    },
    {
      id: 8,
      name: "Wool Newsboy Cap",
      price: 150,
      image: hat8,
      category: "Premium",
      size: "L",
      color: "Grey",
    },
  ];

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

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      filters.category.length > 0
        ? filters.category.includes(product.category)
        : true;

    const matchColor =
      filters.color.length > 0 ? filters.color.includes(product.color) : true;

    const matchPrice =
      product.price >= filters.price.min && product.price <= filters.price.max;

    return matchCategory && matchColor && matchPrice;
  });

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
