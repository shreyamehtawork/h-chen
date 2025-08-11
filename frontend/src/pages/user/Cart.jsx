// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCartItems,
//   updateQuantity,
//   deleteCartItem,
//   clearCart,
// } from "../../store/cartSlice";
// import { toast } from "react-toastify";

// function CartPage() {
//   const dispatch = useDispatch();
//   const { items, totalPrice, totalQuantity, loading } = useSelector(
//     (state) => state.cart
//   );

//   useEffect(() => {
//     dispatch(fetchCartItems());
//   }, [dispatch]);

//   const handleQuantityChange = (productId, quantity) => {
//     if (quantity < 1) return;
//     dispatch(updateQuantity({ productId, quantity }))
//       .unwrap()
//       .catch(() => toast.error("Error updating quantity"));
//   };

//   const handleDelete = (productId) => {
//     dispatch(deleteCartItem(productId))
//       .unwrap()
//       .then(() => toast.success("Item removed"))
//       .catch(() => toast.error("Error removing item"));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart())
//       .unwrap()
//       .then(() => toast.success("Cart cleared"))
//       .catch(() => toast.error("Error clearing cart"));
//   };

//   // if (loading) return <div className="container py-5">Loading...</div>;

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4">Your Cart</h2>

//       {items.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           <table className="table table-bordered align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th style={{ width: "150px" }}>Quantity</th>
//                 <th>Total</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item.product._id}>
//                   <td>
//                     <div className="d-flex align-items-center">
//                       <img
//                         src={item.product.images[0]}
//                         alt={item.product.title}
//                         style={{
//                           width: "60px",
//                           height: "60px",
//                           objectFit: "cover",
//                         }}
//                         className="me-3 rounded"
//                       />
//                       {item.product.title}
//                     </div>
//                   </td>
//                   <td>${item.product.salePrice.toFixed(2)}</td>
//                   <td>
//                     <div className="d-flex align-items-center">
//                       <button
//                         className="btn btn-sm btn-outline-secondary"
//                         onClick={() =>
//                           handleQuantityChange(
//                             item.product._id,
//                             item.quantity - 1
//                           )
//                         }
//                       >
//                         −
//                       </button>
//                       <span className="px-2">{item.quantity}</span>
//                       <button
//                         className="btn btn-sm btn-outline-secondary"
//                         onClick={() =>
//                           handleQuantityChange(
//                             item.product._id,
//                             item.quantity + 1
//                           )
//                         }
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td>
//                     ${(item.product.salePrice * item.quantity).toFixed(2)}
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(item.product._id)}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="d-flex justify-content-between align-items-center mt-4">
//             <button
//               className="btn btn-outline-danger"
//               onClick={handleClearCart}
//             >
//               Clear Cart
//             </button>
//             <h4>
//               Total ({totalQuantity} items): ${totalPrice}
//             </h4>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default CartPage;

import react from "react";

function Cart() {
  return <h1>Cart</h1>;
}

export default Cart;
