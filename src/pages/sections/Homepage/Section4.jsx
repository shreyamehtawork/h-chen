import React from "react";
import "../../../styling/Section4.css";

const Section4 = () => {
  return (
    <section className="faq-section text-white py-5">
      <div className="container">
        <h1>HAT STORE FAQ</h1>
        <h2 className="faq-title mb-4">Common Questions</h2>

        <div className="row ">
          <div className="col-2"></div>
          <div className="col-6">
            {" "}
            <p className="faq-description mb-5">
              Explore our frequently asked questions to find answers to queries
              about our hats, services, and <br />
              more. If you have additional questions, feel free to reach out to
              our team for assistance.
            </p>
            <div className="faq-item mb-5">
              <h5 className="faq-question">
                What materials are used in your hats?
              </h5>
              <p className="faq-answer">
                Our hats are crafted using a variety of premium materials such
                as wool, straw, and felt. Each material is carefully selected to
                ensure durability, comfort, and style.
              </p>
            </div>
            <div className="faq-item mb-5">
              <h5 className="faq-question">
                Do you offer custom hat fittings?
              </h5>
              <p className="faq-answer">
                Yes, we provide personalized hat fitting services to ensure you
                find the perfect hat that complements your style and fits you
                comfortably. Visit our store for a bespoke fitting experience.
              </p>
            </div>
            <div className="faq-item">
              <h5 className="faq-question">
                What styles of hats do you specialize in?
              </h5>
              <p className="faq-answer">
                Our specialty lies in a wide range of hat styles including
                Panama hats, fedoras, bowlers, and straw hats. Whether you
                prefer classic designs or contemporary trends, we have a hat for
                every preference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
