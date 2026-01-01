import mongoose from "mongoose";

const makeModelSchema = new mongoose.Schema({
  make: String,
  model: String,
  yearFrom: Number,
  yearTo: Number
}, { _id: false });

const specSchema = new mongoose.Schema({
  key: String,
  value: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  sku: { type: String, index: true },
  title: { type: String, required: true, text: true },
  description: { type: String, text: true },
  category: { type: String, index: true },
  brand: { type: String, index: true },
  subCategory: String,
  makeModels: [makeModelSchema],
  specs: [specSchema],
  images: [{ url: String, public_id: String }],
  price: { type: Number, required: true },
  salePrice: Number,
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  relatedParts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
}, { timestamps: true });

productSchema.index({ title: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);
export default Product;
