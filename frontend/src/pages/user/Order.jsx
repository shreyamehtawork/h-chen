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
    return <p className="text-center mt-10">Loading your orders...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        {error.message || "Failed to load orders"}
      </p>
    );
  }

  if (!orders || orders.length === 0) {
    return <p className="text-center mt-10">No orders found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h2 className="font-semibold">Order ID: {order._id}</h2>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalPrice}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>

            <div className="mt-3">
              <h3 className="font-medium">Items:</h3>
              <ul className="list-disc list-inside">
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    {item.product?.title} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
