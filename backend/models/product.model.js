import mongoose from "mongoose";

// monta o schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// cria o modelo
const Product = mongoose.model("Product", productSchema);
// => sempre no singular pois o mongoose ja coloca no plural

export default Product;
