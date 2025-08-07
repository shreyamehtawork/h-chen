import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      default: "user",
    },
    email: {
      type: String,
      required: false,
      trim: true,
      // unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    phone_number: {
      type: String,
      maxLength: 10,
      required: false,
      // unique: true,
    },
    first_name: {
      type: String,
      trim: true,
      required: false,
    },
    last_name: {
      type: String,
      trim: true,
      required: false,
    },
    profile_image: {
      type: String,
      required: true,
      default:
        "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
    },
    country: {
      type: String,
      required: true,
      default: "India",
    },
    wishlist_products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
