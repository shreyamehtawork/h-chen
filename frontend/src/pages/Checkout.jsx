import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAddresses,
  addAddress,
  setSelectedAddress,
} from "../store/addressSlice";
import { fetchCartItems, clearCart } from "../store/cartSlice";
import { createOrder } from "../store/orderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    addresses,
    selectedAddress,
    loading: addressLoading,
  } = useSelector((state) => state.address);

  const {
    items,
    totalPrice,
    loading: cartLoading,
  } = useSelector((state) => state.cart);

  const { userData } = useSelector((state) => state.auth);
  // Form state for new address
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    addressType: "Home",
    isDefault: false,
  });

  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    dispatch(getAllAddresses());
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleAddressSelect = (addr) => {
    dispatch(setSelectedAddress(addr));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    dispatch(addAddress(newAddress)).then((res) => {
      if (!res.error) {
        setShowAddressForm(false);
        setNewAddress({
          fullName: "",
          phone: "",
          alternatePhone: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: "",
          country: "India",
          addressType: "Home",
          isDefault: false,
        });
        dispatch(getAllAddresses());
      }
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.error("Please select an address before placing the order");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderDetails = {
      address: selectedAddress._id,
      items: items.map((item) => ({
        product: item.product._id,
        title: item.product.title,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      })),
      billingMethod: "cod",
      totalPrice: totalPrice,
    };

    // toast.error("FAILD");
    console.log("This is my order", orderDetails);
    dispatch(createOrder(orderDetails)).then((res) => {
      if (!res.error) {
        dispatch(clearCart());
        navigate("/user/order");
      }
    });
  };

  return (
    <div className="checkout-page p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="row">
        {/* Address Section */}
        <div className="mb-8 col-md-8">
          {/* Address Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Select Delivery Address
            </h3>
            {addressLoading ? (
              <p>Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <p>No addresses found. Please add one.</p>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr._id}
                    className={`flex items-start gap-3 p-4 border rounded cursor-pointer ${
                      selectedAddress?._id === addr._id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300"
                    }`}
                  >
                    {/* Radio input ensures only ONE address can be selected */}
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddress?._id === addr._id}
                      onChange={() => handleAddressSelect(addr)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium">{addr.fullName}</p>
                      <p className="text-sm text-gray-600">{addr.phone}</p>
                      <p className="text-sm">{`${addr.addressLine1}, ${addr.city}, ${addr.state} - ${addr.postalCode}`}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="mt-4 text-blue-500"
            >
              {showAddressForm ? "Cancel" : "+ Add New Address"}
            </button>
          </div>

          {showAddressForm && (
            <form
              onSubmit={handleAddressSubmit}
              className="mt-4 p-4 border rounded space-y-3"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={newAddress.fullName}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, fullName: e.target.value })
                }
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Alternate Phone"
                value={newAddress.alternatePhone}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    alternatePhone: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Address Line 1"
                value={newAddress.addressLine1}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    addressLine1: e.target.value,
                  })
                }
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={newAddress.addressLine2}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    addressLine2: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={newAddress.postalCode}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    postalCode: e.target.value,
                  })
                }
                required
                className="w-full p-2 border rounded"
              />

              <button type="submit" className="btn btn-dark px-4 py-2 rounded">
                Save Address
              </button>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="mb-8 col-md-4">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {cartLoading ? (
            <p>Loading cart...</p>
          ) : items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.product._id}-${item.color}-${item.size}`}
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    {item.product.title} ({item.size}/{item.color}) x{" "}
                    {item.quantity} =
                  </span>
                  <span>₹{item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span> ₹{totalPrice}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={items.length === 0 || !selectedAddress}
                className={`w-full py-3 rounded btn btn-outline-dark font-semibold ${
                  items.length === 0 || !selectedAddress
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
