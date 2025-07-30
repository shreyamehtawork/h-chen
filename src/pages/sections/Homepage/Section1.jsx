import React from "react";
import "../../../styling/Section1.css";
import heroImg from "../../../assets/images/hero.jpg"; // Replace with your image path

const Section1 = () => {
  return (
    <section className="hero-section container-fluid py-5">
      <div className="row align-items-center">
        {/* Left text */}
        <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0 px-4">
          {/* <div className="badge-tag mb-3">
            <span className="badge-icon">✳</span>
            <span className="badge-text">
              SUMMER IS HERE
              <br />
              GET READY!
            </span>
          </div> */}
          <h1 className="hero-title">
            UNDER <br className="d-none d-md-block" />
            CONSTRUCTION <br className="d-none d-md-block" />
            ⚠️🚀
          </h1>
          <p className="hero-subtitle mt-3">
            Discover our new summer collection! <br />
            Shop now and refresh wardrobe.
          </p>
        </div>

        {/* Right image */}
        <div className="col-lg-6 text-center px-4">
          <img src={heroImg} alt="hero" className="img-fluid hero-img" />
        </div>
      </div>
    </section>
  );
};

export default Section1;
