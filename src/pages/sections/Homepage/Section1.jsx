import React from "react";
import "../../../styling/Section1.css";
import womanImage from "../../../assets/women.png";

function Section1() {
  return (
    <div>
      <div className="container-fluid contact-wrapper d-flex justify-content-center align-items-center mt-5 mb-1">
        <div className="row w-100 text-center">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <p className="contact-info">info@mysite.com</p>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <img
              src={womanImage}
              alt="Model"
              className="img-fluid women-image"
            />
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <p className="contact-info">123-456-7890</p>
          </div>
        </div>
      </div>
      <div className="col-12" id="discover-style">
        DISCOVER STYLE
      </div>
    </div>
  );
}

export default Section1;
