import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../styling/SingleProductView.css";
import { getProductDetails } from "../services/productService";
import Loader from "./Loader";
import { addProductToCart, fetchCartItems } from "../store/cartSlice";
import { createWhatsAppService } from "../services/whatsApp";
import { FaWhatsapp } from "react-icons/fa";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import {
  deleteWishlistItem,
  addProductToWishlist,
} from "../store/wishlistSlice";

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
    if (res) {
      console.log("PRODUCT: ", res);
      // console.log("Whatsapp link: ", createWhatsAppService(res));
      res.whatsappLink = createWhatsAppService(res);
      setProduct(res);
    }

    setLoadingProduct(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [category, id]);

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
        dispatch(fetchCartItems()); // ✅ Refresh cart items
      })
      .catch((err) =>
        // toast.error(err?.message || "Error adding product to cart")
        console.log("ERRORR THIS IUS", err)
      );
  };

  const { items: wishlistItems, loading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );

  let isInWishlist = wishlistItems?.some((item) => item._id === product._id);
  const handleWishlist = () => {
    if (!product?._id) return;

    // check if product is already in wishlist

    if (isInWishlist) {
      dispatch(deleteWishlistItem({ productId: product._id }))
        .unwrap()
        .then(() => {
          toast.info("Removed from wishlist");
        })
        .catch((err) => {
          toast.error(err?.message || "Error removing from wishlist");
        });
    } else {
      dispatch(addProductToWishlist({ productId: product._id }))
        .unwrap()
        .then(() => {
          toast.success("Added to wishlist");
        })
        .catch((err) => {
          toast.error(err?.message || "Error adding to wishlist");
        });
    }
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
            <Link to={`/shop/${category}`}>{category}</Link> / {product.title}
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
              <p className="fs-2">Rs.{product.price}/-</p>
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
              <div className="gap-1 mt-5">
                <button
                  className="col-md-5 btn btn-outline-danger"
                  style={{ marginRight: "40px", padding: "10px 20px",  }}
                  onClick={handleWishlist}
                  disabled={wishlistLoading}
                >
                  <IoHeartOutline size={20} style={{ marginRight: "5px" }} />
                  <span>
                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  </span>
                </button>

                <button
                  className="col-md-6 btn btn-outline-dark "
                  onClick={handleAddtoCart}
                  style={{ padding: "10px 20px" }}
                  disabled={loading}
                >
                  <IoCartOutline /> {loading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
              <a
                href={product.whatsappLink}
                target="_blank"
                className="btn btn-success d-flex align-items-center justify-content-center gap-1 mt-3"
                style={{ backgroundColor: "#25D366", border: "none" }}
              >
                <FaWhatsapp /> Order on WhatsApp
              </a>
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
