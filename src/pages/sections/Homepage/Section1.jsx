import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "../../../styling/Section1.css";
import modelImage from "../../../assets/images/heromain.avif";

function HeroSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Only apply upward movement to text elements
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className="hero-section container-fluid" ref={sectionRef}>
      {/* Left Text */}
      <div className="col-md-4 text-end hero-text-left position-relative z-1">
        <motion.h1
          className="hero-word left-side-text"
          style={{ y: textY }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          YOUR
        </motion.h1>
        <motion.h1
          className="hero-word left-side-text starts"
          style={{ y: textY }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          STARTS
        </motion.h1>
      </div>

      {/* Center Image */}
      <motion.div
        className="col-md-4 text-center position-relative z-2"
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={
          isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 1.2 }}
      >
        <img src={modelImage} alt="Model" className="hero-model-img" />
      </motion.div>

      {/* Right Text */}
      <div className="col-md-4 text-start hero-text-right position-relative z-1">
        <motion.h1
          className="hero-word right-side-text"
          style={{ paddingLeft: "30px", y: textY }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          STYLE
        </motion.h1>
        <motion.h1
          className="hero-word right-side-text"
          style={{ paddingLeft: "60px", y: textY }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          HERE
        </motion.h1>
      </div>
    </section>
  );
}

export default HeroSection;
