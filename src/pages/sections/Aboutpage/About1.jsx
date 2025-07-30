import React from "react";
import "../../../styling/About1.css";
import aboutImage from "../../../assets/aboutsection.png";
import aboutImage2 from "../../../assets/aboutsection2.png";

function About1() {
  return (
    <div className="about-section">
      <div className="text-center pt-5">
        <h4 id="abouttitle" style={{ fontSize: "50px" }}>
          ABOUT
        </h4>
      </div>
      <div className="row mt-5 text-center about-content">
        <div className="col-md-6 px-5 py-5" id="about-right">
          <h4>Our Story</h4>
          <p>
            Discover the essence of H. Chen, where classic meets contemporary in
            our handcrafted hat collection. Each hat is a masterpiece sourced
            from artisans and top brands, ensuring durability and style. At H.
            Chen, we go beyond just hats; we offer an experience of personalized
            fittings to elevate your wardrobe to new heights.
          </p>
        </div>
        <div className="col-md-6" id="about-left">
          <img src={aboutImage} alt="hatimage.png"></img>
        </div>
        <div className="col-md-5 mt-2">
          <p>
            Explore the fusion of timeless designs and premium materials that
            define H. Chen. Our curated collection of classic and contemporary
            hats for both men and women reflects our dedication to quality,
            style, and individuality.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About1;
