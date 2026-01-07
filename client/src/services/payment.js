import axios from "axios";
import { loadRazorpay } from "../utility/loadRazorpay";

export const handleRazorpayPayment = async ({
  totalAmount,
  user,
  cartItems,
  navigate,
}) => {
  const isLoaded = await loadRazorpay();
  if (!isLoaded) {
    alert("Razorpay SDK failed");
    return;
  }

  // 1️⃣ Create order (backend)
  const { data: order } = await axios.post(
    "http://localhost:8700/api/v1/payment/create-order",
    { amount: totalAmount }
  );

  // 2️⃣ Open Razorpay Checkout
  const options = {
    key: "rzp_test_S01atzUOBtAWY8",
    amount: order.amount,
    currency: order.currency,
    name: "My E-Commerce",
    description: "Order Payment",
    order_id: order.id,

    handler: async function (response) {
      // 3️⃣ Verify payment
      const verify = await axios.post(
        "http://localhost:8700/api/v1/payment/verify-payment",
        response
      );

      if (verify.data.success) {
        // 4️⃣ Create order in DB
        await axios.post("http://localhost:8700/api/v1/orders", {
          user: user._id,
          products: cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          paymentInfo: {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            totalPrice: totalAmount,
            paymentMethod: "Razorpay",
          },
        });

        navigate("/success");
      } else {
        alert("Payment verification failed");
      }
    },

    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
    theme: {
      color: "#000",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
