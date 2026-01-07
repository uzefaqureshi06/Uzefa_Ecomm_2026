import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getCartProductByUserID,
} from "../../redux/actions/cart";
import useAuthenticated from "../../hooks/useAuthenticate";

// Icons
import { Plus, Minus, X, User } from "lucide-react";

function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [removedItems, setRemovedItems] = useState({});

  const { user, isAuthenticated } = useAuthenticated();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart || []);

  /* ================= FETCH CART ================= */
  useEffect(() => {
    if (user?._id) {
      dispatch(getCartProductByUserID(user._id));
    }
  }, [dispatch, user]);

  /* ================= LOAD LOCAL STORAGE ================= */
  useEffect(() => {
    const storedQty = localStorage.getItem("cart_quantities");
    const storedRemoved = localStorage.getItem("cart_removed");

    if (storedQty) setQuantities(JSON.parse(storedQty));
    if (storedRemoved) setRemovedItems(JSON.parse(storedRemoved));
  }, []);

  /* ================= SAVE LOCAL STORAGE ================= */
  useEffect(() => {
    localStorage.setItem("cart_quantities", JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    localStorage.setItem("cart_removed", JSON.stringify(removedItems));
  }, [removedItems]);

  /* ================= QTY HANDLERS ================= */
  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      if (current <= 1) return prev;
      return { ...prev, [id]: current - 1 };
    });
  };

  /* ================= REMOVE ITEM ================= */
  const removeItem = (id) => {
    setRemovedItems((prev) => ({ ...prev, [id]: true }));

    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    dispatch(deleteCartProduct(id));
  };

  /* ================= FILTER CART ================= */
  const visibleCartItems = cartData.filter((item) => !removedItems[item._id]);

  /* ================= CART COUNT ================= */
  const cartCount = visibleCartItems.reduce(
    (sum, item) => sum + (quantities[item._id] || item.quantity || 1),
    0
  );

  /* ================= PRICE CALCULATIONS ================= */
  const subtotal = visibleCartItems.reduce((total, item) => {
    const qty = quantities[item._id] || item.quantity || 1;
    return total + (item.product?.price || 0) * qty;
  }, 0);

  const taxPrice = Math.round(subtotal * 0.18);
  const shippingPrice = subtotal > 5000 ? 0 : 200;
  const totalPrice = subtotal + taxPrice + shippingPrice;

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dxqt7tfgl/image/upload/v1765790770/logo_aiay4c.jpg"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="menu-icons">
          {isAuthenticated ? (
            <Link
              to="/auth"
              className="login-btn"
              onClick={() => localStorage.clear()}
            >
              Logout
            </Link>
          ) : (
            <Link to="/auth" className="login-btn">
              Login
            </Link>
          )}

          {/* ===== USER AVATAR ===== */}
          {isAuthenticated && (
            <Link to="/" className="avatar-wrapper">
              {user?.avatar ? (
                <img src={user.avatar} alt="User" className="navbar-avatar" />
              ) : (
                <div className="avatar-fallback">
                  <User size={20} />
                </div>
              )}
            </Link>
          )}

          {/* ===== CART ===== */}
          <div className="cart-container" onClick={() => setOpenCart(true)}>
            <i className="bx bx-cart"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
      </header>

      {/* ================= MINI CART ================= */}
      <div className={`mini_cart ${openCart ? "open" : ""}`}>
        <div className="cart_close">
          <h3>Cart</h3>
          <X onClick={() => setOpenCart(false)} />
        </div>

        {visibleCartItems.length > 0 ? (
          visibleCartItems.map((item) => {
            const qty = quantities[item._id] || item.quantity || 1;
            const product = item.product || {};

            return (
              <div className="cart_item" key={item._id}>
                <div className="cart_img">
                  <img src={product.frontImg} alt={product.name} />
                </div>

                <div className="cart_info">
                  <p>{product.name}</p>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item._id)}>
                      <Minus size={14} />
                    </button>
                    <span>{qty}</span>
                    <button onClick={() => increaseQty(item._id)}>
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="price_cart">Rs. {product.price * qty}</span>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        )}

        {visibleCartItems.length > 0 && (
          <>
            <div className="cart_total">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>

            <div className="cart_total">
              <span>Tax</span>
              <span>Rs. {taxPrice}</span>
            </div>

            <div className="cart_total">
              <span>Shipping</span>
              <span>
                {shippingPrice === 0 ? "Free" : `Rs. ${shippingPrice}`}
              </span>
            </div>

            <div className="cart_total grand_total">
              <strong>Total</strong>
              <strong>Rs. {totalPrice}</strong>
            </div>

            <div className="mini_cart_footer">
              <Link to="/cart">View Cart</Link>
              <Link
                to="/checkout"
                className="active"
                onClick={() => setOpenCart(false)}
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>

      {openCart && (
        <div className="cart-overlay" onClick={() => setOpenCart(false)} />
      )}
    </>
  );
}

export default Navbar;
