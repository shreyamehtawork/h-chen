// src/components/ArticlesSection.jsx
import React from "react";
import "../../../styling/BlogSection.css";

import article from "../../../assets/images/article.avif";
import article1 from "../../../assets/images/article1.avif";

import article2 from "../../../assets/images/article2.avif";

const articles = [
  {
    title: "Find your perfect fit today – comfort",
    category: "CONFIDENCE",
    date: "Jun 18, 2024",
    image: article1,
    darkOverlay: false,
  },
  {
    title: "Shop timeless pieces for every occasion",
    category: "ESSENTIALS",
    date: "May 5, 2024",
    image: article2,
    darkOverlay: false,
  },
];

const BlogSection = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 fw-light">Read our articles</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="article-wrapper with-overlay">
            <img src={article} alt="innovatiove" className="img-fluid" />
            <div className="article-content overlay-text">
              <p className="article-category mb-1">INNOVATIVE</p>
              <h5 className="article-title mb-2">
                Discover our latest fashion trends excluisivelwy
              </h5>
              <p className="article-date"> 12 July 2024</p>
            </div>{" "}
          </div>
        </div>
        {articles.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div
              className={`article-wrapper ${
                item.darkOverlay ? "with-overlay" : ""
              }`}
            >
              <img src={item.image} alt={item.title} className="img-fluid" />
              <div
                className={`article-content ${
                  item.darkOverlay ? "overlay-text" : ""
                }`}
              >
                <p className="article-category mb-1">{item.category}</p>
                <h5 className="article-title mb-2">{item.title}</h5>
                <p className="article-date">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <button className="read-more-btn">READ MORE</button>
      </div>
    </div>
  );
};

export default BlogSection;
