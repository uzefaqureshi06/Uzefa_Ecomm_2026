import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: Number,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
    },
    paymentInfo: {
      orderId: String,
      paymentId: String,
      signature: String,
      paymentMethod: String,
      paymentStatus: String,
      totalPrice: Number,
      paidAt: Date,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
