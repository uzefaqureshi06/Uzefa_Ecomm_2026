import {
  FaHandHoldingUsd,
  FaUndoAlt,
  FaShippingFast,
  FaTags,
  FaGem,
} from "react-icons/fa";
import "./FeatureBars.css";

function FeaturesBar() {
  return (
    <section className="features-bar">
      <div className="feature-item">
        <div className="icon">
          <FaHandHoldingUsd />
        </div>
        <h4>COD</h4>
        <p>Available</p>
      </div>

      <div className="feature-item">
        <div className="icon">
          <FaUndoAlt />
        </div>
        <h4>7 Days</h4>
        <p>Return</p>
      </div>

      <div className="feature-item">
        <div className="icon">
          <FaShippingFast />
        </div>
        <h4>Fast</h4>
        <p>Delivery</p>
      </div>

      <div className="feature-item">
        <div className="icon">
          <FaTags />
        </div>
        <h4>Affordable</h4>
        <p>Price</p>
      </div>

      <div className="feature-item">
        <div className="icon">
          <FaGem />
        </div>
        <h4>Exclusive</h4>
        <p>Collection</p>
      </div>
    </section>
  );
}

export default FeaturesBar;
