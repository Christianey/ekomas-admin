import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    default: null,
  },
});

const Category =
  mongoose.models.category || mongoose.model("category", CategorySchema);

export default Category;
