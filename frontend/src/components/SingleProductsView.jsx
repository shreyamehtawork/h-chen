import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import slugify from "slugify";
import allProducts from "../pages/ProductsData";
import "../styling/SingleProductView.css";
import { getProductDetails, getProducts } from "../services/productService";
import Loader from "./Loader";

function SingleProductsView() {
  const { id, category } = useParams();
  // const product = allProducts.find(
  //   (p) => slugify(p.name, { lower: true }) === slug
  // );

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const fetchProduct = async () => {
    const res = await getProductDetails(id);
    console.log("Category Product:", res);
    if (res) setProduct(res);
    setLoadingProduct(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [category]);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // if (!product) return <div>Product not found</div>;

  const imageVariant = {
    hidden: { opacity: 0, x: -100, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  const infoVariant = {
    hidden: { opacity: 0, x: 100, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  return (
    <div className="container py-5">
      {loadingProduct ? (
        <Loader />
      ) : (
        <>
          <nav className="mb-4">
            <Link to="/">Home</Link> /{" "}
            <Link to={`/${category}`}>{category}</Link> / {product.title}
          </nav>
      

          <div className="row align-items-start">
            {/* Image */}
            <motion.div
              className="col-md-6"
              variants={imageVariant}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="img-fluid border rounded"
              />
            </motion.div>

            {/* Product Info */}

            <motion.div
              className="col-md-6 mt-4 mt-md-0"
              variants={infoVariant}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="fw-bold">{product.title}</h2>
              <p className="fs-4">${product.price.toFixed(2)}</p>

              <div className="mb-3">
                <label className="form-label">Color *</label>
                <select
                  className="form-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option>Select</option>
                  {product.colors.map((color, index) => (
                    <option style={{textTransform: "capitalize"}} key={index}>{color}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Size *</label>
                <select
                  className="form-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option>Select</option>
                  {product.sizes.map((size, index) => (
                    <option style={{textTransform: "capitalize"}} key={index}>{size}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-3 mb-0">Quantity *</label>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <button className="btn btn-dark w-100 mt-3">Add to Cart</button>

              <div style={{
                margin: "30px 0 0 0"
              }} className="">
                <p>{product.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. A doloremque animi aliquid cumque id. Facilis quibusdam inventore fugiat? Molestias odit aspernatur blanditiis temporibus molestiae eligendi perferendis possimus minus dolorum voluptates.</p>
              </div>

              {/* Social Icons */}
              <div className="d-flex gap-3 mt-4">
                <i className="bi bi-facebook fs-5"></i>
                <i className="bi bi-pinterest fs-5"></i>
                <i className="bi bi-whatsapp fs-5"></i>
                <i className="bi bi-x fs-5"></i>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleProductsView;
