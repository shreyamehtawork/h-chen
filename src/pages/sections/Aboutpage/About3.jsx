import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../styling/About3.css";

function About3() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.3 });

  return (
    <section ref={sectionRef}>
      <div id="about3section">
        <div className="container mt-5">
          <motion.h2
            className="about-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            OUR BELIEFS
          </motion.h2>
        </div>

        <div className="container about3content">
          <div className="row mb-3">
            <motion.div
              className="col-md-5 mt-5"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              Our Philosophy
            </motion.div>

            <motion.div
              className="col-md-6 px-5 py-5"
              id="about-right"
              initial={{ opacity: 0, x: 50, filter: "blur(4px)" }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : { opacity: 0, x: 50, filter: "blur(4px)" }
              }
              transition={{ duration: 0.9 }}
            >
              <p>
                At Chloé, we don’t dress bodies —
                <br />
                We <strong>honor stories</strong>.
                <br />
                Each piece is carefully crafted to celebrate individuality with
                elegance, blending heritage artistry with a{" "}
                <em>quiet luxury</em> that doesn’t scream — it speaks.
              </p>
              <br />
              <p>
                Because *premium* isn’t about price tags, It’s about purpose,
                precision, and presence. It’s how a product makes you *feel*.
                And we want you to feel *valued*, **understood**, and
                **beautifully bold** — just as you are.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About3;
