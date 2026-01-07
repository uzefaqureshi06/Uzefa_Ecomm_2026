import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Order.css";
import { getOrder } from "../../redux/actions/orders";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders = [], loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  if (loading) {
    return (
      <p style={{ color: "#d4af37", textAlign: "center" }}>Loading orders...</p>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1 className="orders-title">My Orders</h1>
        <div className="orders-divider"></div>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-row">
                <span className="label">Order ID</span>
                <span className="value">{order._id}</span>
              </div>

              <div className="order-row">
                <span className="label">Date</span>
                <span className="value">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="order-row">
                <span className="label">Status</span>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-row">
                <span className="label">Payment</span>
                <span className="value">
                  {order.paymentInfo?.paymentStatus}
                </span>
              </div>

              <div className="order-row">
                <span className="label">Total</span>
                <span className="value">₹{order.paymentInfo?.totalPrice}</span>
              </div>

              <button className="order-btn">View Details</button>
            </div>
          ))
        ) : (
          <p className="empty-orders">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
