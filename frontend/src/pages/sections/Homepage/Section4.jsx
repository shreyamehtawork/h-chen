import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../../../styling/Section4.css";

const faqVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Section4 = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  return (
    <motion.section
      className="faq-section text-white py-5"
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
      }}
    >
      <div className="container">
        <h1>HAT STORE FAQ</h1>
        <h2 className="faq-title mb-4">Common Questions</h2>

        <div className="row">
          <div className="col-2"></div>
          <div className="col-6">
            <p className="faq-description mb-5">
              Explore our frequently asked questions to find answers to queries
              about our hats, services, and <br />
              more. If you have additional questions, feel free to reach out to
              our team for assistance.
            </p>

            {[
              // Use array to allow stagger
              {
                question: "What materials are used in your hats?",
                answer:
                  "Our hats are crafted using a variety of premium materials such as wool, straw, and felt. Each material is carefully selected to ensure durability, comfort, and style.",
              },
              {
                question: "Do you offer custom hat fittings?",
                answer:
                  "Yes, we provide personalized hat fitting services to ensure you find the perfect hat that complements your style and fits you comfortably. Visit our store for a bespoke fitting experience.",
              },
              {
                question: "What styles of hats do you specialize in?",
                answer:
                  "Our specialty lies in a wide range of hat styles including Panama hats, fedoras, bowlers, and straw hats. Whether you prefer classic designs or contemporary trends, we have a hat for every preference.",
              },
            ].map((item, i) => (
              <motion.div
                className="faq-item mb-5"
                key={i}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={faqVariants}
              >
                <h5 className="faq-question">{item.question}</h5>
                <p className="faq-answer">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Section4;
