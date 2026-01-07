import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthenticated from "../../hooks/useAuthenticate";
import { loadRazorpay } from "../../utility/loadRazorpay";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuthenticated();
  const cartData = useSelector((state) => state.cart || []);

  const subtotal = cartData.reduce((total, item) => {
    const qty = item.quantity || 1;
    return total + item.product.price * qty;
  }, 0);

  const taxPrice = Math.round(subtotal * 0.18);
  const shippingPrice = subtotal > 5000 ? 0 : 200;
  const totalPrice = subtotal + taxPrice + shippingPrice;

  const handlePayment = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) return toast.error("Razorpay SDK failed");

    try {
      const { data: razorpayOrder } = await axios.post(
        "http://localhost:8700/api/v1/payment/create-order",
        { amount: totalPrice }
      );

      const options = {
        key: "rzp_test_S01atzUOBtAWY8",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "INDIA JEWELLERY",
        description: "Luxury Jewelry Checkout",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          const verify = await axios.post(
            "http://localhost:8700/api/v1/payment/verify-payment",
            response
          );

          if (!verify.data.success) {
            toast.error("Payment verification failed");
            return;
          }

          await axios.post("http://localhost:8700/api/v1/orders", {
            user: user._id,
            products: cartData.map((item) => ({
              product: item.product._id,
              quantity: item.quantity || 1,
            })),
            status: "Processing",
            paymentInfo: {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              paymentMethod: "Razorpay",
              totalPrice,
            },
          });

          toast.success("Order placed successfully ✨");
          navigate("/success");
        },

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },

        theme: { color: "#d4af37" },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-card highlight">
          <h2 className="checkout-title">Order Summary</h2>

          <div className="price-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="price-row">
            <span>Tax (18%)</span>
            <span>₹{taxPrice}</span>
          </div>

          <div className="price-row">
            <span>Shipping</span>
            <span className={shippingPrice === 0 ? "free" : ""}>
              {shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}
            </span>
          </div>

          <div className="divider" />

          <div className="price-row total">
            <span>Total Payable</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>

        <div className="checkout-card payment-card">
          <h2 className="checkout-title">Secure Payment</h2>

          <p className="payment-text">
            Encrypted & trusted payment powered by Razorpay.
          </p>

          <div className="razorpay-box">
            <img
              src="https://razorpay.com/assets/razorpay-logo.svg"
              alt="Razorpay"
            />
            <span>100% Secure Payments</span>
          </div>

          <button className="pay-btn bold" onClick={handlePayment}>
            Pay ₹{totalPrice}
          </button>

          <p className="secure-note">🔒 SSL secured • No card details stored</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
