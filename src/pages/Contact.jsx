import React from "react";
import hatStore from "../assets/contact.avif";
import "../styling/contact.css";

function Contact() {
  return (
    <div>
      <div className="text-white bg-black contact-hero">
        <div className="container">
          <div>
            <h2 className="contact-heading">GET IN TOUCH</h2>
          </div>

          <div className="contact-content">
            <h5>Visit Our Store Today.</h5>
            <p className="contact-paragraph col-md-7">
              We welcome you to explore our exquisite hat collection in person.
              Our team is here to assist you in finding the perfect headpiece to
              elevate your style.
            </p>
          </div>
        </div>
      </div>

      <section>
        <div id="contact-section" className="text-white">
          <div className="row mb-3">
            <div className="col-md-5">
              <img src={hatStore} className="contact-image" alt="Hat Store" />
            </div>
            <div className="col-md-4 form">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
