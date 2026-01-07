import Order from "../models/orders.js";

/**
 * CREATE ORDER (after payment success)
 */
export const addOrder = async (req, res) => {
  try {
    const {
      products,
      user,
      quantity,
      status = "Processing",
      paymentInfo,
    } = req.body;

    const newOrder = await Order.create({
      products,
      user,
      quantity,
      status,
      paymentInfo: {
        orderId: paymentInfo.orderId,
        paymentId: paymentInfo.paymentId,
        signature: paymentInfo.signature,
        paymentMethod: paymentInfo.paymentMethod || "Razorpay",
        paymentStatus: "Paid",
        totalPrice: paymentInfo.totalPrice,
        paidAt: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL ORDERS (Admin)
 */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product")
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ORDERS BY USER ID
 */
export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE ORDER STATUS (Admin)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        status,
        deliveredAt: status === "Delivered" ? new Date() : null,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE ORDER
 */
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET TOTAL REVENUE
 */
export const getTotalPrice = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$paymentInfo.totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      totalRevenue: result[0]?.totalRevenue || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
