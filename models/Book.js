const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    mainImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    description: { type: String },
    genre: { type: String },
    publisher: { type: String },
    publicationYear: { type: Number },
    seller: { type: Schema.Types.ObjectId, ref: "User" },
    isAvailable: { type: Boolean, default: true },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
