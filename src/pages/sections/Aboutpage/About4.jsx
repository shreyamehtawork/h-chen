import React from "react";
import "../../../styling/About4.css";
import manImg from "../../../assets/man.png"; // Replace with actual path
import womanImg from "../../../assets/women-team.png"; // Replace with actual path

const employeeDetails = [
  {
    name: "David Rodriguez",
    image: manImg,
    description:
      "Alice is our lead designer, bringing creativity and precision to every hat design, ensuring each piece reflects the essence of H. Chen's style and quality.",
    email: "info@mysite.com",
    phone: "123-456-7890",
  },
  {
    name: "Alice Chen",
    image: womanImg,
    description:
      "David is our style consultant, dedicated to providing personalized fitting services that help customers discover the perfect hat to complement their individual look.",
    email: "info@mysite.com",
    phone: "123-456-7890",
  },
];

const About4 = () => {
  return (
    <div className="container my-5 team-section">
      <h1 className="display-4 team-heading mb-5">TEAM</h1>

      {employeeDetails.map((employee, index) => (
        <div key={index} className="row align-items-center team-member mb-5">
          <div className="col-md-9">
            <h6 className="team-name">{employee.name}</h6>
            <p className="team-description">{employee.description}</p>
            <p className="team-contact">
              {employee.email}
              <br />
              {employee.phone}
            </p>
          </div>
          <div className="col-md-3 text-md-end">
            <img
              src={employee.image}
              alt={employee.name}
              className="img-fluid team-img"
            />
          </div>
          {index !== employeeDetails.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default About4;
