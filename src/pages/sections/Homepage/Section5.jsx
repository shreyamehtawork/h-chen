import React from "react";
import "../../../styling/Section5.css";

function Section5() {
  return (
    <div className="section-5 text-center">
      <div className="container">
        <div className="d-block mb-5 section5-headline">
          <span>EXCLUSIVE OFFER</span>
        </div>
        <div className="d-block ">
          <h4>Limited Time Deal</h4>
          <p className="mt-3">
            Elevate your style with our premium collection at special prices.
            <br></br>Don't miss out on our exclusive hat promotion.
            <br></br>Explore now before the offer ends!
          </p>
          <button className="btn btn-outline-dark">Shop Now</button>
        </div>
      </div>
    </div>
  );
}

export default Section5;
