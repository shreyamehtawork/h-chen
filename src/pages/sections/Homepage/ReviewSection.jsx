import React, { useState } from "react";
import "../../../styling/ReviewSection.css";

const reviews = [
  {
    text: "Amazing quality and quick delivery! Truly exceeded my expectations with every product.",
    author: "Emily Carter",
    location: "Los Angeles, CA",
  },
  {
    text: "Exceptional customer service and stunning designs. I’ll definitely shop here again!",
    author: "James Brown",
    location: "New York, NY",
  },
  {
    text: "Loved the whole experience. The products look even better in person.",
    author: "Sophia Lee",
    location: "Chicago, IL",
  },
  {
    text: "So elegant and well-crafted. My go-to place for premium fashion now.",
    author: "Daniel Kim",
    location: "San Francisco, CA",
  },
  {
    text: "Omg",
    author: "Daniel Kim",
    location: "San Francisco, CA",
  },
  {
    text: "So wow",
    author: "Daniel Kim",
    location: "San Francisco, CA",
  },
];

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const totalSlides = Math.ceil(reviews.length / 2);

  const next = () => {
    setIndex((prev) => (prev + 1) % totalSlides);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentReviews = reviews.slice(index * 2, index * 2 + 2);

  return (
    <section className="testimonial-section container-fluid d-flex">
      <div className="testimonial-left d-flex flex-column justify-content-between">
        <div>
          <p className="section-subtitle">WHAT CLIENTS ARE SAYING</p>
          <h2 className="section-title">Customer care is our priority</h2>
        </div>
        <div className="carousel-controls">
          <button onClick={prev}>&lt;</button>
          <span>
            {index + 1}/{totalSlides}
          </span>
          <button onClick={next}>&gt;</button>
        </div>
      </div>

      <div className="testimonial-carousel d-flex">
        {currentReviews.map((review, idx) => (
          <div className="testimonial-card" key={idx}>
            <p className="testimonial-text">"{review.text}"</p>
            <div className="stars">★★★★★</div>
            <p className="author">
              <strong>{review.author}</strong> / {review.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialCarousel;
