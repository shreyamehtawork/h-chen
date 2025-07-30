import React from "react";
import "../../../styling/About1.css";
import aboutImage from "../../../assets/aboutsection.png";
import aboutImage2 from "../../../assets/aboutsection2.png";

function About1() {
  return (
    <div className="about-section">
      {/* Title & Subtitle */}
      <div className="text-center pt-5">
        <h4 id="abouttitle" style={{ fontSize: "50px" }}>
          WHY CHLOÉ
        </h4>
        <h5 className="mt-5 aboutsubtitle">
          Chloé is more than just a name. It’s a <em>feeling</em>, a{" "}
          <strong>statement</strong>, and <em>a soft rebellion</em> in a world
          that rushes past emotions.
        </h5>
      </div>

      {/* Section: Identity */}
      <div className="row text-center about-content">
        <div className="col-md-6 px-5 py-5" id="about-right">
          <p>
            We created Chloé for{" "}
            <strong>every soul who’s ever felt unseen</strong>.
            <br />
            For women who carry grace like fire,
            <br />
            Men who choose tenderness without apology,
            <br />
            Children who dream in color,
            <br />
            And every beautiful human in between —
            <br />
            across identities and spectrums.
          </p>
        </div>
        <div className="col-md-6" id="about-left">
          <img src={aboutImage} alt="Chloé identity visual" />
        </div>
      </div>

      {/* Section: What Premium Means */}
      <div className="row text-center about-content">
        <h5 className="p-3 border-bottom" style={{ color: "#fff" }}>
          Chloé — Where every identity is seen. Where elegance feels like home.
        </h5>
      </div>
    </div>
  );
}

export default About1;
