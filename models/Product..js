import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
});

const Product =
  mongoose.models.product || mongoose.model("product", ProductSchema);

export default Product;
