import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/orderSlice";

function Order() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-5 fs-5">Loading your orders...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-danger mt-5">
        {error.message || "Failed to load orders"}
      </p>
    );
  }

  // Ensure orders is always treated as an array
  const orderList = Array.isArray(orders) ? orders : orders ? [orders] : [];

  if (orderList.length === 0) {
    return <p className="text-center mt-5 text-muted">No orders found</p>;
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 fw-bold">🛒 My Orders</h1>
      <div className="row g-4">
        {orderList.map((order) => (
          <div className="col-12" key={order._id}>
            <div className="card shadow-lg border-0 rounded-3 order-card h-100">
              <div className="card-body p-4">
                {/* Order Header */}
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                  <div>
                    <h5 className="card-title mb-1 fw-bold">
                      Order ID:{" "}
                      <span className="text-primary">{order._id}</span>
                    </h5>
                    <small className="text-muted">
                      Placed on:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="text-end">
                    <span
                      className={`badge px-3 py-2 fs-6 rounded-pill ${
                        order.status === "Delivered"
                          ? "bg-success"
                          : order.status === "Pending"
                          ? "bg-warning text-dark"
                          : order.status === "Processing"
                          ? "bg-info text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="fw-bold fs-4 mt-2 mb-0 text-success">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <h6 className="fw-semibold mb-2">Items in this order:</h6>
                <ul className="list-group list-group-flush">
                  {order.items?.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <span className="fw-medium">{item.product?.title}</span>
                      </div>
                      <span className="badge bg-light text-dark border">
                        × {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-3 text-end">
                  <button className="btn btn-outline-primary btn-sm">
                    View Details
                  </button>
                  <button className="btn btn-primary btn-sm ms-2">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Small CSS tweaks */}
      <style>
        {`
          .order-card {
            transition: transform 0.2s ease-in-out;
          }
         
        `}
      </style>
    </div>
  );
}

export default Order;
