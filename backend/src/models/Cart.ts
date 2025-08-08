import { model, models, Schema } from "mongoose";


const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, default: 1 },
            color: { type: String, required: true},
            size: { type: String, required: true},
        },
    ],
})

const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;