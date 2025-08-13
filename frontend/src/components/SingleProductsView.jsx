import React, { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../styling/SingleProductView.css";
import { getProductDetails } from "../services/productService";
import Loader from "./Loader";
import { addProductToCart, fetchCartItems } from "../store/cartSlice";

function SingleProductsView() {
  const { id, category } = useParams();

  const { userData } = useSelector((state) => state.auth);
  // console.log("IAM THE USER:", userData.id);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cart);

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fetchProduct = async () => {
    const res = await getProductDetails(id);
    if (res) setProduct(res);
    // console.log("PRODUCT ID: ", product._id);
    setLoadingProduct(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [category]);

  const handleAddtoCart = () => {
    if (!selectedColor || selectedColor === "Select") {
      toast.error("Please select a color");
      return;
    }
    if (!selectedSize || selectedSize === "Select") {
      toast.error("Please select a size");
      return;
    }

    dispatch(
      addProductToCart({
        productId: product._id,
        quantity,
        color: selectedColor,
        size: selectedSize,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Product added to cart!");
        // dispatch(fetchCartItems()); // ✅ Refresh cart items
      })
      .catch((err) =>
        // toast.error(err?.message || "Error adding product to cart")
        console.log("ERRORR THIS IUS", err)
      );
  };

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
              className="col-md-5 mt-4 mt-md-0"
              variants={infoVariant}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="fw-bold">{product.title}</h2>
              <div style={{ margin: "30px 0" }}>
                <p>{product.description}</p>
              </div>
              <p className="fs-2">${product.price.toFixed(2)}</p>
              {/* Color */}
              <div className="mb-3">
                <label className="form-label">Color *</label>
                <select
                  className="form-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option>Select</option>
                  {product.colors.map((color, index) => (
                    <option style={{ textTransform: "capitalize" }} key={index}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              {/* Size */}
              <div className="mb-3">
                <label className="form-label">Size *</label>
                <select
                  className="form-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option>Select</option>
                  {product.sizes.map((size, index) => (
                    <option style={{ textTransform: "capitalize" }} key={index}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              {/* Quantity */}
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

              <button
                className="btn btn-dark w-100 mt-3"
                onClick={handleAddtoCart}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
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
