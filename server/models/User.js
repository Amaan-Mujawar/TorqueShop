import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  phone: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },

  addresses: [addressSchema]

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
