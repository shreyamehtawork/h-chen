import React from "react";
import "../../../styling/Section1.css";
import modelImage from "../../../assets/images//hero.png"; // Replace with your image path

function HeroSection() {
  return (
    <section className="hero-section container-fluid">
      <div className="row align-items-center justify-content-center gx-0">
        {/* LEFT TEXT */}
        <div className="col-4 text-end hero-text-left">
          <h1 className="hero-word">YOUR</h1>
          <h1 className="hero-word">STARTS</h1>
        </div>

        {/* CENTER IMAGE */}
        <div className="col-4 text-center position-relative">
          <img
            src={modelImage}
            alt="Model"
            className="hero-model-img position-relative"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="col-4 text-start hero-text-right">
          <h1 className="hero-word">STYLE</h1>
          <h1 className="hero-word">HERE</h1>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
