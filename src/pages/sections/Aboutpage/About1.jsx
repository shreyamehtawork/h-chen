import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../styling/About1.css";
import aboutImage from "../../../assets/images/infants/image10.jpg";

function About1() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.3 });

  return (
    <div className="about-section" ref={sectionRef}>
      {/* Title & Subtitle */}
      <div className="text-center pt-5">
        <motion.h4
          id="abouttitle"
          style={{ fontSize: "50px" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          WHY CHLOÉ
        </motion.h4>
        <motion.h5
          className="mt-5 aboutsubtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Chloé is more than just a name. It’s a <em>feeling</em>, a{" "}
          <strong>statement</strong>, and <em>a soft rebellion</em> in a world
          that rushes past emotions.
        </motion.h5>
      </div>

      {/* Section: Identity */}
      <div className="row text-center about-content">
        <motion.div
          className="col-md-6 px-5 py-5"
          id="about-right"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.9 }}
        >
          <p>
            We created Chloé for{" "}
            <strong>every soul who’s ever felt unseen</strong>.
            <br />
            For women who carry grace like fire,
            <br />
            Men who choose tenderness without apology,
            <br />
            Children who dream in color,
            <br />
            And every beautiful human in between —<br />
            across identities and spectrums.
          </p>
        </motion.div>

        <motion.div
          className="col-md-6"
          id="about-left"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.9 }}
        >
          <img src={aboutImage} alt="Chloé identity visual" />
        </motion.div>
      </div>

      {/* Section: Tagline */}
      <motion.div
        className="row text-center about-content"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h5 className="p-3 border-bottom" style={{ color: "#fff" }}>
          Chloé — Where every identity is seen. Where elegance feels like home.
        </h5>
      </motion.div>
    </div>
  );
}

export default About1;
