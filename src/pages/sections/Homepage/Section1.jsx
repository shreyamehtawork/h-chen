import React from "react";
import "../../../styling/Section1.css";
import modelImage from "../../../assets/images/heromain.avif";

function HeroSection() {
  return (
    <section className="hero-section container-fluid">
      <div className="col-md-4 text-end hero-text-left position-relative z-1">
        <h1 className="hero-word">YOUR</h1>
        <h1 className="hero-word starts">STARTS</h1>
      </div>

      <div className="col-md-4 text-center position-relative z-0">
        <img src={modelImage} alt="Model" className="hero-model-img" />
      </div>

      <div className="col-md-4 text-start hero-text-right position-relative z-1">
        <h1 className="hero-word" style={{ paddingLeft: "20px" }}>
          STYLE
        </h1>
        <h1 className="hero-word" style={{ paddingLeft: "20px" }}>
          HERE
        </h1>
      </div>
    </section>
  );
}

export default HeroSection;
