import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import aboutImage2 from "../../../assets/aboutsection2.png";
import "../../../styling/About2.css";

function About2() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.3 });

  return (
    <div className="about2-container bg-black text-center" ref={sectionRef}>
      <motion.img
        src={aboutImage2}
        alt="About Section"
        className="about2-image"
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.95,
          filter: isInView ? "blur(0px)" : "blur(6px)",
        }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}

export default About2;
