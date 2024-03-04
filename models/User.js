const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      name: { type: String },
      city: { type: String },
      state: { type: String },
      address: { type: String },
      contactDetails: {
        phone: {
          type: String,
        },
        email: {
          type: String,
        },
      },
      image: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
    approved: {
      type: Boolean,
      default: false,
    },
    // transactionHistory: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    // ],
    createdSells: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
