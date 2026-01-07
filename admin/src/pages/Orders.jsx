import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrder } from "../redux/actions/orders";
import { toast } from "react-toastify";
const OrdersTable = () => {
  const dispatch = useDispatch();

  const orderData = useSelector((state) => state?.order?.orders);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      dispatch(deleteOrder(id));
      toast.success("Order Deleted Successfully ✅");
      setTimeout(() => {
        dispatch(getOrder());
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Order Deletion Failed ❌");
    }
  };
  return (
    <div className="bg-black text-white p-6 rounded-2xl">
      {/* HEADER */}
      <h2 className="text-xl font-semibold text-yellow-400 mb-1">
        Orders Data
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Number of Orders: {orderData?.length || 0}
      </p>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-800">
              <th className="py-3">Users</th>
              <th>Location</th>
              <th>City</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Mobile Number</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {orderData?.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-900 hover:bg-gray-900 transition"
              >
                {/* USER */}
                <td className="py-4 flex items-center gap-3">
                  <img
                    src={order?.user?.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">
                      {order?.user?.fname} {order?.user?.lname}
                    </p>
                    <p className="text-sm text-gray-400">
                      {order?.user?.email}
                    </p>
                  </div>
                </td>

                {/* LOCATION */}
                <td>
                  <p>{order?.user?.country}</p>
                  <p className="text-sm text-gray-400">{order?.user?.state}</p>
                </td>

                {/* CITY */}
                <td>
                  <p>{order?.user?.city}</p>
                  <p className="text-sm text-gray-400">
                    {order?.user?.pinCode}
                  </p>
                </td>

                {/* QTY */}
                <td>{order?.quantity}</td>

                {/* PRICE */}
                <td className="text-yellow-400 font-medium">
                  ₹{order?.paymentInfo?.totalPrice}
                </td>

                {/* STATUS */}
                <td>
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-400">
                    {order?.status}
                  </span>
                </td>

                {/* PHONE */}
                <td>{order?.user?.number}</td>

                {/* DELETE */}
                <td>
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 text-red-500 cursor-pointer hover:bg-red-500/10">
                    <Trash2 onClick={() => handleDelete(order._id)} size={18} />
                  </div>
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {orderData?.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
