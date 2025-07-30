import React, { useRef, useEffect } from "react";
import "../styling/FilterSidebar.css";

function FilterSidebar({ filters, handleFilterChange, resetFilters }) {
  const minRange = 50;
  const maxRange = 175;

  const rangeTrackRef = useRef(null);

  const updateTrackFill = () => {
    const track = rangeTrackRef.current;
    if (!track) return;

    const minPercent =
      ((filters.price.min - minRange) / (maxRange - minRange)) * 100;
    const maxPercent =
      ((filters.price.max - minRange) / (maxRange - minRange)) * 100;

    track.style.background = `linear-gradient(to right, 
      #ccc ${minPercent}%, 
      black ${minPercent}%, 
      black ${maxPercent}%, 
      #ccc ${maxPercent}%)`;
  };

  useEffect(() => {
    updateTrackFill();
  }, [filters.price]);

  const handlePriceChange = (type, value) => {
    const newVal = parseInt(value);
    if (type === "min" && newVal <= filters.price.max) {
      handleFilterChange({
        target: { name: "price", value: { ...filters.price, min: newVal } },
      });
    } else if (type === "max" && newVal >= filters.price.min) {
      handleFilterChange({
        target: { name: "price", value: { ...filters.price, max: newVal } },
      });
    }
  };

  return (
    <div className="filter-sidebar">
      <h5 className="section-title">Browse</h5>
      <ul className="browse-links">
        <li
          className={filters.category.length === 0 ? "active" : ""}
          onClick={resetFilters}
        >
          All Products
        </li>
      </ul>

      <div className="filter-group">
        <label className="filter-subtitle">Category</label>
        {["Contempory", "Classic", "Premium"].map((cat) => (
          <div className="form-check checkbox-list" key={cat}>
            <input
              className="form-check-input"
              type="checkbox"
              name="category"
              value={cat}
              checked={filters.category.includes(cat)}
              onChange={handleFilterChange}
            />
            <label className="form-check-label">{cat}</label>
          </div>
        ))}
      </div>

      <div className="filter-group">
        <label className="filter-subtitle">Color</label>
        {["Grey", "Navy", "Black", "Beige", "Blue"].map((color) => (
          <div className="form-check checkbox-list" key={color}>
            <input
              className="form-check-input"
              type="checkbox"
              name="color"
              value={color}
              checked={filters.color.includes(color)}
              onChange={handleFilterChange}
            />
            <label className="form-check-label">{color}</label>
          </div>
        ))}
      </div>

      <div className="filter-group">
        <label className="filter-subtitle">Price Range</label>

        <div className="range-slider-wrapper">
          <div className="tooltip-container">
            <span className="tooltip">{filters.price.min}</span>
            <span className="tooltip">{filters.price.max}</span>
          </div>
          <div className="range-slider-container">
            <input
              type="range"
              min={minRange}
              max={maxRange}
              value={filters.price.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
            />
            <input
              type="range"
              min={minRange}
              max={maxRange}
              value={filters.price.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
            />
            <div className="range-slider-track" ref={rangeTrackRef}></div>
          </div>
        </div>

        <div className="price-labels d-flex justify-content-between mt-2">
          <span>${filters.price.min}</span>
          <span>${filters.price.max}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
