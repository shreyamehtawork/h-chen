import React from "react";
import "../styling/ProductPage.css";
import slugify from "slugify";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function ProductList({ products }) {
  const category = useParams().category;

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="container mt-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="row">
        {products.map((product) => {
          const slug = slugify(product.name, { lower: true });

          return (
            <motion.div
              className="col-md-3 mb-4"
              key={product.id}
              variants={cardVariants}
            >
              <div className="card product-card border-0">
                <a href={`/${category}/${slug}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top img-fluid"
                  />
                  <div className="card-body text-center p-2">
                    <h5 className="card-title mb-1">{product.name}</h5>
                    <p className="card-text">${product.price.toFixed(2)}</p>
                  </div>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ProductList;
