import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import "../../../styling/Section3.css";
import allProducts from "../../ProductsData";
import { Link } from "react-router-dom";

function Section3() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    const maxStart = allProducts.length - visibleCount;
    setStartIndex((prev) => Math.min(prev + visibleCount, maxStart));
  };

  const visibleProducts = allProducts.slice(
    startIndex,
    startIndex + visibleCount
  );

  // Variants
  const fadeInOutContainer = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
    hidden: { opacity: 0, y: 40 },
  };

  const cardVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <section
      className="container-fluid py-5 hat-gallery-section mb-5"
      ref={sectionRef}
    >
      <motion.div
        className="text-center mb-5"
        variants={cardVariant}
        animate={isInView ? "visible" : "hidden"}
        initial="hidden"
      >
        <h1 className="display-4 gallery-title">CHLOE'S GALLERY</h1>
        <h3 className="gallery-subtitle mt-4">Explore the products</h3>
        <p className="gallery-description px-3 px-md-5 mx-auto">
          Immerse yourself in the artistry of our designs. Each weave tells a
          unique story of creativity and style. Discover the perfect product
          that resonates with your personality and taste.
        </p>
      </motion.div>

      <div className="d-flex align-items-center justify-content-center">
        <button
          className="arrow-btn me-3"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          ←
        </button>

        <motion.div
          className="section3-carousel-wrapper"
          variants={fadeInOutContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="section3-carousel-track">
            {visibleProducts.map((product) => (
              <motion.div
                className="section3-card"
                key={product.id}
                variants={cardVariant}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="section3-img"
                />
                <div className="section3-info">
                  <h5 className="product-title">{product.name}</h5>
                  <p className="product-price">${product.price}</p>
                  <small className="product-category">{product.category}</small>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <button
          className="arrow-btn ms-3"
          onClick={handleNext}
          disabled={startIndex + visibleCount >= allProducts.length}
        >
          →
        </button>
      </div>

      <motion.div
        className="text-center"
        variants={cardVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <button className="btn btn-outline-dark mt-5">
          <Link to={"/shopall"} className="text-decoration-none">
            Show More
          </Link>
        </button>
      </motion.div>
    </section>
  );
}

export default Section3;
