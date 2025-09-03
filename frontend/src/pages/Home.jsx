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

      <Section2 />
      <div
        style={{
          background: "black",
          color: "white",
          height: "50px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          position: "relative",
          fontFamily: "Geo",
          fontWeight: "bold",
          padding: "35px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            paddingLeft: "100%",
            animation: "scroll-left 80s linear infinite",
          }}
        >
          MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50%
          OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL
          PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥
          &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE !
          50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL
          PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥
          &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE !
          50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL
          PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥
          &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE !
          50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL
          PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥
          &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE !
          50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL
          PRODUCTS &nbsp;🔥 &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥
          &nbsp; MEGA SALE ! 50% OFF ON ALL PRODUCTS &nbsp;🔥 &nbsp;{" "}
        </div>

        {/* Keyframes injected inline */}
        <style>
          {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
        </style>
      </div>
      <Section3 />
      <ReviewSection />
      <Section5 />
      <Section6 />
      <BlogSection />
      <Section4 />
    </div>
  );
}

export default Home;
