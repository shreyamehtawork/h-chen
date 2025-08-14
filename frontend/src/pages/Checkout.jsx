import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../store/orderSlice";
import { clearCart } from "../store/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items,
    totalPrice,
    loading: cartLoading,
  } = useSelector((state) => state.cart);
  const { loading: orderLoading } = useSelector((state) => state.order);
  const { addresses } = useSelector((state) => state.address);

  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (
      !addressForm.street ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.zip
    ) {
      toast.error("Please fill in all address fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      items: items.map((i) => ({
        product: i.product.id,
        quantity: i.quantity,
        price: i.product.price,
        color: i.product.color,
        size: i.product.size,
      })),
      shippingAddress: addressForm, // send full address object instead of ID
      totalAmount: totalPrice,
      modeOfPayment: "Cash",
    };

    dispatch(createOrder(orderData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        navigate("/my-orders");
      } else {
        toast.error("Failed to place order");
      }
    });
  };

  return (
    <div className="container py-4">
      <div className="text-center">
        <h2>Checkout</h2>
        <hr></hr>
      </div>

      {/* Address Form */}
      <div className="row gap-5">
        <section className="col-md-7">
          <h4 style={{ textDecoration: "underline" }}>
            Enter Delivery Address
          </h4>
          <br></br>
          <form>
            <div className="mb-3">
              <label className="form-label">
                Apartment/Building/House No./Street
              </label>
              <input
                type="text"
                className="form-control"
                name="street"
                value={addressForm.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={addressForm.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={addressForm.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-control"
                name="zip"
                value={addressForm.zip}
                onChange={handleChange}
                required
              />
            </div>
            <button onClick={handleAddresses} className="btn btn-outline-dark">
              Save Address for further orders
            </button>
          </form>
        </section>

        {/* Order Summary */}
        <section className=" col-md-3 ">
          <h4 style={{ textDecoration: "underline" }}>Order Summary</h4>
          <br></br>
          {cartLoading ? (
            <p>Loading cart...</p>
          ) : items.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul className="list-group mb-3">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.product.color}-${item.product.size}`}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    {item.product.title} (x{item.quantity})
                  </span>
                  <strong>₹{item.product.price * item.quantity}</strong>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between fs-5">
                <span>Total</span>
                <strong>₹{totalPrice}</strong>
              </li>
            </ul>
          )}
          <h6>
            Mode of Payment: <strong>Cash</strong>
          </h6>
          <div style={{ textAlign: "end" }}>
            <button
              className="btn btn-dark  mt-3"
              onClick={handlePlaceOrder}
              disabled={orderLoading}
            >
              {orderLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;
