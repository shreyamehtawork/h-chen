import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import hatStore from "../assets/contact.avif";
import "../styling/contact.css";

function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { threshold: 0.2, once: false });

  const fadeSlideUp = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div ref={sectionRef}>
      {/* Contact Hero */}
      <div className="text-white bg-black contact-hero">
        <div className="container">
          <motion.h2
            className="contact-heading"
            variants={fadeSlideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8 }}
          >
            GET IN TOUCH
          </motion.h2>

          <motion.div
            className="contact-content"
            variants={fadeSlideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h5>Visit Our Store Today.</h5>
            <p className="contact-paragraph col-md-7">
              We welcome you to explore our exquisite hat collection in person.
              Our team is here to assist you in finding the perfect headpiece to
              elevate your style.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section id="contact-section" className="text-white">
        <div className="row mb-3">
          <motion.div
            className="col-md-5"
            variants={fadeSlideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={hatStore} className="contact-image" alt="Hat Store" />
          </motion.div>

          <motion.div
            className="col-md-4 form"
            variants={fadeSlideUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form>
              <label>First Name *</label>
              <input
                className="form form-control"
                type="text"
                placeholder="Enter your first name."
              />
              <label>Last Name *</label>
              <input
                className="form form-control"
                type="text"
                placeholder="Enter your last name."
              />
              <label>Email *</label>
              <input
                className="form form-control"
                type="email"
                placeholder="Enter your email id."
              />
              <label>Message</label>
              <textarea className="form form-control"></textarea>
              <a
                href="mailto:xyz@gmail.com?subject=Mail to H.CHEN&body=My email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-outline-light contact-btn">
                  Send
                </button>
              </a>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
