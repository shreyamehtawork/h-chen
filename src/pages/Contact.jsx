import React from "react";
import hatStore from "../assets/contact.avif";

function Contact() {
  return (
    <div>
      <section className="text-white bg-black">
        <div className="container" style={{ paddingTop: "100px" }}>
          <div>
            <h2 style={{ fontSize: "50px" }}>GET IN TOUCH</h2>
          </div>

          <div style={{ marginTop: "150px" }}>
            <h5>Visit Our Store Today.</h5>
            <p className="fs-4 col-md-9 mt-4">
              We welcome you to explore our exquisite hat collection in person.
              Our team is here to assist you in finding the perfect headpiece to
              elevate your style.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div id="contact-section" className="text-white">
          <div class="row mb-3">
            <div class="col-md-5">
              <img
                src={hatStore}
                width="200"
                height="500"
                style={{ objectFit: "cover" }}
              ></img>
            </div>
            <div class="col-md-4 ">
              <form>
                <label>First Name *</label>
                <br></br>
                <input
                  className="form form-control"
                  type="text"
                  placeholder="Enter your first name."
                ></input>
                <br></br>
                <label>Last Name *</label>
                <br></br>
                <input
                  className="form form-control"
                  type="text"
                  placeholder="Enter your last name."
                ></input>
                <br></br>
                <label>Email *</label>
                <br></br>
                <input
                  className="form form-control"
                  type="email"
                  placeholder="Enter your email id."
                ></input>
                <br></br>
                <label>Message</label>
                <br></br>
                <textarea className="form form-control"></textarea>
                <br></br>
                <a
                  href="mailto:xyz@gmail.com=Mail to H.CHEN&body=My email"
                  target="_blank"
                >
                  <button className="btn btn-outline-light">Send</button>
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
