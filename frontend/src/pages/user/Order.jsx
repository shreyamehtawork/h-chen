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
    <div className="container">
      <h1 className="text-center mb-4">My Orders</h1>
      <div className="row g-4">
        {orderList.map((order) => (
          <div className="col-12" key={order._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                {/* Order Header */}
                <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                  <div>
                    <h5 className="card-title mb-1">
                      Order ID:{" "}
                      <span className="text-primary">{order._id}</span>
                    </h5>
                    <small className="text-muted">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="text-end">
                    <span
                      className={`badge ${
                        order.status === "Delivered"
                          ? "bg-success"
                          : order.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="fw-bold fs-3 mt-2 mb-0">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <h6 className="fw-semibold">Items:</h6>
                <ul className="list-group list-group-flush">
                  {order.items?.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{item.product?.title}</span>
                      <span className="text-muted">× {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
