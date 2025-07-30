// import React from "react";

// function BrowseBy({ onTypeChange, onColorChange }) {
//   const types = ["Classic", "Contemporary", "Premium"];
//   const colors = ["Gray", "Beige", "Black"];

//   return (
//     <div className="browse-sidebar p-3">
//       <h5 className="mb-3">Browse by</h5>
//       <ul className="list-unstyled mb-4">
//         <li>
//           <a href="#" className="text-dark text-decoration-underline">
//             All Products
//           </a>
//         </li>
//         {types.map((type) => (
//           <li key={type}>
//             <a href="#" className="text-dark">
//               {type}
//             </a>
//           </li>
//         ))}
//       </ul>

//       <h6 className="mb-2">Filter by</h6>

//       <div className="accordion" id="filterAccordion">
//         <div className="accordion-item">
//           <h2 className="accordion-header" id="headingOne">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterType"
//             >
//               Product type
//             </button>
//           </h2>
//           <div id="filterType" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               {types.map((type) => (
//                 <div key={type}>
//                   <input
//                     type="checkbox"
//                     id={type}
//                     onChange={() => onTypeChange(type)}
//                   />
//                   <label htmlFor={type} className="ms-2">
//                     {type}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="accordion-item">
//           <h2 className="accordion-header" id="headingColor">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#filterColor"
//             >
//               Color
//             </button>
//           </h2>
//           <div id="filterColor" className="accordion-collapse collapse">
//             <div className="accordion-body">
//               {colors.map((color) => (
//                 <div key={color}>
//                   <input
//                     type="checkbox"
//                     id={color}
//                     onChange={() => onColorChange(color)}
//                   />
//                   <label htmlFor={color} className="ms-2">
//                     {color}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BrowseBy;
