import React from "react";
import "../../../styling/Section6.css";
import herovideo from "../../../assets/hero.mp4";

function Section6() {
  return (
    <div className="hero-video-wrapper container text-center my-5">
      <video className="hero-video" controls playsInline muted autoPlay loop>
        <source src={herovideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Section6;
