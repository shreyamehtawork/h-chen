import React from "react";
import ModalImage from "react-modal-image";
import { CloseSquareFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../store/cartSlice"; // adjust path if needed
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function TableInCheckout({ item }) {
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(
      deleteCartItem({
        productId: item.product._id,
        color: item.color,
        size: item.size,
      })
    )
      .unwrap()
      .then(() => toast.success("Item removed from cart"))
      .catch((err) => console.log(err.message));
  };

  return (
    <tbody>
      <tr>
        <td>
          <div>
            <p className="checkout-img-wrapper">
              <ModalImage
                small={item.product.images[0]}
                large={item.product.images[0]}
              />
            </p>
          </div>
        </td>
        <td>
          <Link to={`/product/${item.product._id}`}>{item.product.title}</Link>
        </td>
        <td>₹ {item.product.price}</td>
        <td>{item.color}</td>
        <td>{item.size}</td>
        <td>{item.quantity}</td>
        <td>
          <CloseSquareFilled
            className="checkout-remove-icon text-danger cursor-pointer text-xl"
            onClick={handleDeleteItem}
          />
        </td>
      </tr>
    </tbody>
  );
}

export default TableInCheckout;
