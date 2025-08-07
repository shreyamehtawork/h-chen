import React from "react";
import About1 from "./sections/Aboutpage/About1";
import About2 from "./sections/Aboutpage/About2";
import About3 from "./sections/Aboutpage/About3";
import About4 from "./sections/Aboutpage/About4";

function About() {
  return (
    <div
      style={{
        overflowX: "hidden",
        backgroundColor: "black",
      }}
    >
      <About1 />
      <About2 />
      <About3 />
      <About4 />
    </div>
  );
}

export default About;
