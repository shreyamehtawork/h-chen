import React from "react";
import aboutImage2 from "../../../assets/aboutsection2.png";

function About2() {
  return (
    <div className="bg-black text-center">
      <img
        src={aboutImage2}
        style={{
          height: "90vh",
          width: "95vw",
          objectFit: "fill",
          // padding: "50px",
        }}
      ></img>
    </div>
  );
}

export default About2;
