import React from "react";
import "../../styling/Footer.css";

const Footer = () => {
  return (
    <div className="container py-5">
      <div className="row footer">
        {/* Left side */}
        <div className="col-md-6 ps-md-5 mb-md-0 left-side">
          <h6 className="brand-name">CHLOE'S VENTURE</h6>
          <h2 className="tagline">
            Where every identity is seen.
            <br></br>
            Where elegance feels like home.
          </h2>
        </div>

        {/* Right side */}
        <div className="col-md-6 right-side pe-md-5">
          <div>
            <p className="mb-1">123-456-7890</p>
            <p className="mb-1">info@mysite.com</p>
            <br></br>
            <p className="mb-1">
              500 Terry Francine St. San
              <br />
              Francisco, CA 94158
            </p>
          </div>
          <div className="d-flex justify-content-between flex-wrap mt-4">
            <ul className="footer-links list-unstyled mb-0">
              <li>Privacy Policy</li>
              <li>Accessibility Statement</li>
              <li>Shipping Policy</li>
              <li>Terms & Conditions</li>
              <li>Refund Policy</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="small copyright">
        © 2035 by H. Chen. Powered and secured by <a href="#">Wix</a>
      </div>
    </div>
  );
};

export default Footer;
