import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../redux/actions/products";
import { toast } from "react-toastify";
const ProductsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Products from Redux
  const productData =
    useSelector((state) => state?.products?.products?.products) || [];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleDelete = (id) => {
    try {
      dispatch(deleteProduct(id));
      toast.success("Product Deleted Successfully ✅");
      setTimeout(() => {
        dispatch(getProducts());
      }, 2000);
      dispatch(getProducts());
    } catch (error) {
      console.log(error);
      toast.success("Product Delete Failed ❌");
    }
  };
  return (
    <div className="bg-black p-6 rounded-xl text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-yellow-400">
          Products Management
        </h2>

        <button
          onClick={() => navigate("/add-product")}
          className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="py-3">Product</th>
            <th>Price & Discount</th>
            <th>Stocks</th>
            <th>Category</th>
            <th>Created At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {productData.length > 0 ? (
            productData.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-800 hover:bg-gray-900 transition"
              >
                {/* PRODUCT */}
                <td className="py-4 flex items-center gap-4">
                  <img
                    src={item.frontImg}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border border-gray-700"
                  />
                  <div className="max-w-xs">
                    <p className="font-semibold text-white line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </td>

                {/* PRICE */}
                <td>
                  <p className="text-white">₹ {item.price}</p>
                  <p className="text-yellow-400">Discount: {item.discount}</p>
                </td>

                {/* STOCK */}
                <td>{item.stocks}</td>

                {/* CATEGORY */}
                <td>{item.category?.name || "—"}</td>

                {/* DATE */}
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                {/* EDIT */}
                <td>
                  <div
                    onClick={() => navigate(`/edit-product/${item._id}`)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 text-yellow-400 cursor-pointer hover:bg-gray-700"
                  >
                    <Pencil size={18} />
                  </div>
                </td>

                {/* DELETE */}
                <td>
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 text-red-500 cursor-pointer hover:bg-gray-700">
                    <Trash2 onClick={() => handleDelete(item?._id)} size={18} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6 text-gray-400">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
