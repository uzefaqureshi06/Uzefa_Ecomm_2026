import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: "rzp_test_S01atzUOBtAWY8",
  key_secret: "tJRXja6fkZhrHpPXTkSqFZUt",
});

/**
 * CREATE RAZORPAY ORDER
 */
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // INR → paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Razorpay order failed" });
  }
};

/**
 * VERIFY PAYMENT
 */
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ success: true });
    }

    res.status(400).json({ success: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
