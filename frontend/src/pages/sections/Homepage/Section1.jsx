import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "../../../styling/Section1.css";
import modelImage from "../../../assets/images/heromain.avif";

function HeroSection() {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1200;

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [-100, 100] : [-200, 200]
  );

  const leftTextX1 = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [100, -30] : isTablet ? [160, -80] : [200, -60]
  );

  const leftTextX2 = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [80, -70] : isTablet ? [140, -100] : [160, -140]
  );

  const rightTextX1 = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [-80, 60] : isTablet ? [-90, 70] : [-100, 90]
  );

  const rightTextX2 = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [-80, 180] : isTablet ? [-90, 220] : [-100, 280]
  );

  return (
    <section className="hero-section container-fluid" ref={sectionRef}>
      {/* Left Text */}
      <div className="col-md-3 text-end hero-text-left ">
        <motion.h1
          className="hero-word left-side-text"
          style={{ y: textY, x: leftTextX1 }}
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: leftTextX1.get() } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          YOUR
        </motion.h1>
        <motion.h1
          className="hero-word left-side-text starts"
          style={{ y: textY, x: leftTextX2 }}
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: leftTextX2.get() } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          STARTS
        </motion.h1>
      </div>

      {/* Center Image */}
      <motion.div className="col-md-6 text-center mt-5 pt-3 position-relative z-2">
        <img src={modelImage} alt="Model" className="hero-model-img" />
      </motion.div>

      {/* Right Text */}
      <div className="col-md-4 text-start hero-text-right position-relative z-1">
        <motion.h1
          className="hero-word right-side-text"
          style={{ y: textY, x: rightTextX1 }}
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: rightTextX1.get() } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          STYLE
        </motion.h1>
        <motion.h1
          className="hero-word right-side-text"
          style={{ y: textY, x: rightTextX2 }}
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: rightTextX2.get() } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          HERE
        </motion.h1>
      </div>
    </section>
  );
}

export default HeroSection;
