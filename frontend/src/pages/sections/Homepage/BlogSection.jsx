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
      <motion.h1
        className="text-center mb-5 fw-light"
        variants={fadeInVariants}
      >
        Read our articles
      </motion.h1>

      <motion.div className="row g-4" variants={containerVariants}>
        <motion.div className="col-md-6" variants={fadeInVariants}>
          <div className="article-wrapper zoom-hover">
            <img src={article} alt="innovative" className="img-fluid" />
            <div className="article-content">
              <p className="article-category mb-1">TRENDS</p>
              <h5 className="article-title mb-2">
                5 Must-Have Pieces for This Season Trends & Essentials
              </h5>
              <p className="article-date">Tue Aug 19 2025</p>
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

      <motion.div
        className="text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <a href="/blog" className="btn btn-outline-dark">
          Read More
        </a>
      </motion.div>
    </motion.div>
  );
};

export default BlogSection;
