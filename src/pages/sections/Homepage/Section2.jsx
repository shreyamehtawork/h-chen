import React from "react";
import image1 from "../../../assets/images/women/image1.jpg";

function Section2() {
  return (
    <div className="container">
      <h1>ABOUT</h1>
      <div className="row w-100 ">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <img src={image1} alt="Model" className="img-fluid about-image" />
        </div>
        <div className="col-md-5">
          <h3 className="our-story-title">Our Story</h3>
          <p className="our-story-content">
            Delve into the world of H. Chen, where passion for hats meets
            craftsmanship. Our handcrafted hats fuse classic designs with
            contemporary styles, ensuring each piece is a statement of elegance
            and quality. With a keen eye for detail, we source hats from local
            artisans and international brands to offer a collection that is
            truly exceptional.
          </p>
          <button type="button" class="btn btn-outline-dark">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section2;
