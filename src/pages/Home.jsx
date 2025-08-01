import React from "react";
import Section1 from "./sections/Homepage/Section1";
import Section2 from "./sections/Homepage/Section2";
import Section4 from "./sections/Homepage/Section4";
import Section5 from "./sections/Homepage/Section5";
import Section6 from "./sections/Homepage/Section6";
import Section3 from "./sections/Homepage/Section3";
import ReviewSection from "./sections/Homepage/ReviewSection";
import BlogSection from "./sections/Homepage/BlogSection";

function Home() {
  return (
    <div>
      <Section1 />
      <hr></hr>
      <Section2 />
      <marquee
        className="p-2"
        behavior="slide"
        direction="left"
        bgcolor="black"
        height="50"
        scrollamount="5"
        style={{
          color: "white",
        }}
      >
        MEGA SALE! 50% OFF ON ALL HATS🔥 &nbsp; MEGA SALE! 50% OFF ON ALL HATS🔥
        &nbsp; MEGA SALE! 50% OFF ON ALL HATS🔥 &nbsp; MEGA SALE! 50% OFF ON ALL
        HATS🔥&nbsp; MEGA SALE! 50% OFF ON ALL HATS🔥&nbsp;
      </marquee>
      <Section3 />

      <Section6 />
      <Section5 />
      <ReviewSection />
      <BlogSection />
      <Section4 />
    </div>
  );
}

export default Home;
