// src/pages/Cart.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TableInCheckout from "../../components/TableInCheckout";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.auth); // Auth user
  const { items, loading } = useSelector((state) => state.cart);
  // console.log("Mien items hu", items);
  // 🔹 Redirect if not logged in
  useEffect(() => {
    if (!userData) {
      navigate("/login");
      toast.info("Please sign up or log in to view your cart");
    }
  }, [userData, navigate]);

  // 🔹 Fetch cart items
  useEffect(() => {
    if (userData) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, userData]);

  // 🔹 Remove item from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
      .unwrap()
      .then(() => toast.success("Item removed from cart"))
      .catch(() => toast.error("Error removing item"));
  };

  function showCartItems() {
    return (
      <table
        className="table table-bordered"
        style={{
          textAlign: "center",

          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            {[
              "Image",
              "Title",
              "Price",
              "Color",
              "Size",
              "Quantity",
              "Remove",
            ].map((header) => (
              <th
                key={header}
                scope="col"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {items.map((item) => (
          <TableInCheckout key={item.product._id} item={item} />
        ))}
      </table>
    );
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!items || items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 pt-2">
          <h4>Your Cart / {items.length} Product(s)</h4>
          <hr></hr>
          {showCartItems()}
        </div>
        <div className="col-md-4 pt-2">
          <h4>Order Summary</h4>
          <hr></hr>
          <p style={{ fontSize: "15px" }}>Products</p>
          {items.map((item, i) => (
            <div key={i}>
              <p style={{ fontSize: "15px" }}>
                {item.product.title} x {item.quantity} = ₹{" "}
                {item.product.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="border-t flex justify-between items-center">
            <hr></hr>
            <h4 className="font-bold">
              Total: ₹
              {items.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              )}
            </h4>
            <hr></hr>
            <br></br>
            <button className="btn btn-dark px-4 py-2 rounded">
              {" "}
              {/* <Link to="/user/checkout">Proceed To Checkout</Link> */}
              <Link
                to={"/user/checkout"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Proceed To Checkout
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// {items.map((product, i) => (
//           <div
//             key={item._id}
//             className="flex items-center justify-between border-b pb-4"
//           >
//             {/* Product Info */}
//             <div className="flex items-center space-x-4" key={i}>
//               <img
//                 src={item.i}
//                 alt={item.name}
//                 className="w-20 h-20 object-cover rounded"
//               />
//               <div>
//                 <h2 className="font-semibold">{item.name}</h2>
//                 <p className="text-gray-500 text-sm">₹{item.price}</p>
//                 {item.color && (
//                   <p className="text-sm text-gray-500">Color: {item.color}</p>
//                 )}
//                 {item.size && (
//                   <p className="text-sm text-gray-500">Size: {item.size}</p>
//                 )}
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col items-end">
//               <p className="font-semibold">₹{item.price * item.quantity}</p>
//               <button
//                 className="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded"
//                 onClick={() => handleRemove(item._id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
