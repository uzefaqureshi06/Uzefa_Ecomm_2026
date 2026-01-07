import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, updateProduct } from "../redux/actions/products";
import { getCategory } from "../redux/actions/category";
import { uploadImageToCloudinary } from "../utility/uploadImage";
import { toast } from "react-toastify";
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ================= REDUX ================= */
  const products =
    useSelector((state) => state?.products?.products?.products) || [];
  const categories = useSelector((state) => state?.category || []);

  const product = products.find((p) => p._id === id);

  /* ================= SINGLE STATE ================= */
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    stocks: "",
    category: "",
    description: "",
    frontImg: "",
    backImg: "",
  });

  /* ================= IMAGE PREVIEW ================= */
  const [preview, setPreview] = useState({
    frontImg: "",
    backImg: "",
  });

  const [uploading, setUploading] = useState(false);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());
  }, [dispatch]);

  /* ================= PREFILL FORM ================= */
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        discount: product.discount || "",
        stocks: product.stocks || "",
        category: product.category?._id || "",
        description: product.description || "",
        frontImg: product.frontImg || "",
        backImg: product.backImg || "",
      });

      setPreview({
        frontImg: product.frontImg || "",
        backImg: product.backImg || "",
      });
    }
  }, [product]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImage = async (e) => {
    const { name, files } = e.target;
    const file = files?.[0];
    if (!file) return;

    // 🔹 Preview instantly
    setPreview((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(file),
    }));

    setUploading(true);
    const imageUrl = await uploadImageToCloudinary(file);
    setUploading(false);

    if (!imageUrl) return;

    setFormData((prev) => ({
      ...prev,
      [name]: imageUrl,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateProduct(id, formData));
      toast.success("Product Updated Successfully ✅");
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      toast.success("Product Updation Failed ❌");
    }
    // console.log("✅ UPDATED PRODUCT DATA 👉", updatedProductData);

    // dispatch(updateProduct(updatedProductData));
    // navigate("/products");
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <div className="w-full max-w-3xl bg-zinc-900 border border-yellow-600/40 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-yellow-400 text-center mb-6">
          ✨ Update Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* NAME */}
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* PRICE */}
          <Input
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />

          {/* DISCOUNT */}
          <Input
            label="Discount (%)"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
          />

          {/* STOCK */}
          <Input
            label="Stock"
            name="stocks"
            type="number"
            value={formData.stocks}
            onChange={handleChange}
          />

          {/* CATEGORY */}
          <div className="md:col-span-2">
            <label className="text-xs text-gray-400">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="text-xs text-gray-400">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="input resize-none"
            />
          </div>

          {/* FRONT IMAGE */}
          <ImageUpload
            label="Front Image"
            name="frontImg"
            preview={preview.frontImg}
            uploading={uploading}
            onChange={handleImage}
          />

          {/* BACK IMAGE */}
          <ImageUpload
            label="Back Image"
            name="backImg"
            preview={preview.backImg}
            uploading={uploading}
            onChange={handleImage}
          />

          {/* ACTIONS */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="btn-primary">
              {uploading ? "Uploading..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .input {
          width: 100%;
          margin-top: 0.25rem;
          padding: 0.55rem 0.75rem;
          background: #000;
          border: 1px solid #3f3f46;
          border-radius: 0.75rem;
          color: white;
        }
        .btn-primary {
          background: #eab308;
          padding: 0.45rem 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
        }
        .btn-outline {
          border: 1px solid #eab308;
          color: #eab308;
          padding: 0.45rem 1.25rem;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-400">{label}</label>
    <input {...props} className="input" />
  </div>
);

const ImageUpload = ({ label, name, preview, uploading, onChange }) => (
  <div>
    <label className="text-xs text-gray-400 block mb-1">{label}</label>
    <label
      htmlFor={name}
      className="h-36 rounded-xl border border-dashed border-yellow-600/50
      flex items-center justify-center cursor-pointer bg-black/40"
    >
      {preview ? (
        <img
          src={preview}
          alt={label}
          className="w-full h-full object-cover rounded-xl"
        />
      ) : uploading ? (
        <span className="text-yellow-400 text-sm">Uploading...</span>
      ) : (
        <Upload className="text-yellow-400" />
      )}
    </label>
    <input
      type="file"
      id={name}
      name={name}
      accept="image/*"
      onChange={onChange}
      className="hidden"
    />
  </div>
);

export default EditProduct;
