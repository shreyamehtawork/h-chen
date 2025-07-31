import React from "react";
import "../../../styling/About4.css";

const About4 = () => {
  return (
    <div className="about4-wrapper container bg-white py-5">
      <div className="container team-section text-center">
        <h1 className="team-heading mb-3">FOUNDER'S NOTE</h1>
        <hr className="divider" />
        <div className="col-md-10 mx-auto px-3 px-md-5">
          <p className="founder-paragraph">
            Chloé is for the confident and the curious,
            <br />
            The expressive and the evolving.
            <br />
            <br></br>
            It’s for you — <br></br>no matter who you love,
            <br /> where you come from,
            <br />
            or how you define yourself.
          </p>

          <p className="founder-paragraph italic mt-4">
            This isn’t fashion.
            <br />
            This is a <em>movement of emotion, elegance, and empathy</em>.
          </p>
          <h5 className="founder-signature mt-4">
            Chloé — Where every identity is seen.
            <br />
            Where elegance feels like home.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default About4;
