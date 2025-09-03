import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlistItems,
  deleteWishlistItem,
} from "../../store/wishlistSlice";
import { Button, Spin, Empty } from "antd";

function Wishlist() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(deleteWishlistItem({ productId }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-serif mb-6">My Wishlist</h1>

      {items.length === 0 ? (
        <Empty description="No items in your wishlist" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id || item.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 flex flex-col"
            >
              {/* Product Image */}
              <div className="h-48 w-full overflow-hidden flex justify-center items-center bg-gray-50">
                <img
                  src={item?.product?.image || "/placeholder.png"}
                  alt={item?.product?.name}
                  className="object-contain h-full"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {item?.product?.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    ₹{item?.product?.price}
                  </p>
                </div>

                {/* Remove Button */}
                <Button
                  danger
                  className="mt-4"
                  onClick={() => handleRemove(item?.product?._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
