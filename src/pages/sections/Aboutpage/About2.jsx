import React from "react";
import aboutImage2 from "../../../assets/aboutsection2.png";
import "../../../styling/About2.css";

function About2() {
  return (
    <div className="about2-container bg-black text-center">
      <img src={aboutImage2} className="about2-image" alt="About Section" />
    </div>
  );
}

export default About2;
