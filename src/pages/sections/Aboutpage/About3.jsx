import React from "react";
import "../../../styling/About3.css";

function About3() {
  return (
    <section>
      <div id="about3section">
        <div className="container mt-5">
          <h2 className="about-title">OUR BELIEFS</h2>
        </div>
        <div className="container about3content">
          <div className="row mb-3 ">
            <div className="col-md-5 mt-5">Our Philosophy</div>
            <div className="col-md-6 px-5 py-5" id="about-right">
              <p>
                At Chloé, we don’t dress bodies —
                <br />
                We <strong>honor stories</strong>.
                <br />
                Each piece is carefully crafted to celebrate individuality with
                elegance, blending heritage artistry with a{" "}
                <em>quiet luxury</em> that doesn’t scream — it speaks.
              </p>
              <br></br>
              <p>
                Because *premium* isn’t about price tags, It’s about purpose,
                precision, and presence. It’s how a product makes you *feel*.
                And we want you to feel *valued, **understood, and **beautifully
                bold* — just as you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About3;
