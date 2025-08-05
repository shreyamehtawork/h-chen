import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../styling/Section5.css";

function Section5() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  const fadeSlideVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "fadeIn",
        stiffness: 70,
        damping: 14,
        duration: 1.5,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      className="section-5 text-center"
      ref={sectionRef}
      variants={fadeSlideVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container section5-content">
        <div className="mb-4 section5-headline">
          <span>EXCLUSIVE OFFER</span>
        </div>
        <h4 className="section5-title">Limited Time Deal</h4>
        <p className="section5-description">
          Elevate your style with our premium collection at special prices.
          <br />
          Don’t miss out on our exclusive hat promotion.
          <br />
          Explore now before the offer ends!
        </p>
        <button className="btn btn-outline-dark mt-3">Shop Now</button>
      </div>
    </motion.div>
  );
}

export default Section5;
