import "./Success.css";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const Success = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 🎉 Confetti Effect */}
      {showConfetti && <Confetti />}

      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">
            <span>✓</span>
          </div>

          <h1 className="success-title">Payment Successful</h1>

          <div className="success-divider"></div>

          <p className="success-text">
            Thank you for shopping with us. Your jewellery order has been placed
            successfully and is being prepared with care.
          </p>

          <div className="success-actions">
            <button className="btn-outline" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>

          <p className="success-footer">
            ✨ Timeless Creations, Crafted for You
          </p>
        </div>
      </div>
    </>
  );
};

export default Success;
