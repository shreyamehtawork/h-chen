import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../styling/BlogSection.css";
import { Link } from "react-router-dom";

import article from "../../../assets/images/article.avif";
import articles from "../../BlogData";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  return (
    <motion.div
      className="container my-5"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h2
        className="text-center mb-5 fw-light"
        variants={fadeInVariants}
      >
        Read our articles
      </motion.h2>

      <motion.div className="row g-4" variants={containerVariants}>
        <motion.div className="col-md-6" variants={fadeInVariants}>
          <div className="article-wrapper with-overlay zoom-hover">
            <img src={article} alt="innovative" className="img-fluid" />
            <div className="article-content overlay-text">
              <p className="article-category mb-1">INNOVATIVE</p>
              <h5 className="article-title mb-2">
                Discover our latest fashion trends exclusively
              </h5>
              <p className="article-date">12 July 2024</p>
            </div>
          </div>
        </motion.div>

        {articles.map((item, index) => (
          <motion.div
            className="col-md-3"
            key={index}
            variants={fadeInVariants}
          >
            <div
              className={`article-wrapper ${
                item.darkOverlay ? "with-overlay" : ""
              } zoom-hover`}
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
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="text-center mt-5" variants={fadeInVariants}>
        <button className="read-more-btn">
          <Link to="/blog" style={{ textDecoration: "none" }}>
            READ MORE
          </Link>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default BlogSection;
