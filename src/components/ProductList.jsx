import React from "react";
import "../styling/ProductPage.css";

function ProductList({ products }) {

  
  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card product-card border-0">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top img-fluid"
              />
              <div className="card-body text-center p-2">
                <h5 className="card-title mb-1">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
