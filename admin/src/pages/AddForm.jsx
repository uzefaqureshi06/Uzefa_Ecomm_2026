"use client";
import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/actions/category";
import { uploadImageToCloudinary } from "../utility/uploadImage";
import { toast } from "react-toastify";
import { createProducts } from "../redux/actions/products";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= FORM DATA ================= */
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stocks: "",
    price: "",
    discount: "",
    category: "",
    frontImg: "",
    backImg: "",
  });

  /* ================= IMAGE PREVIEW ================= */
  const [preview, setPreview] = useState({
    frontImg: null,
    backImg: null,
  });

  const [uploading, setUploading] = useState(false);

  /* ================= REDUX ================= */
  const categories = useSelector((state) => state.category || []);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  /* ================= TEXT HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= IMAGE UPLOAD HANDLER ================= */
  const handleImageUpload = async (file, name) => {
    if (!file) return;

    // Preview immediately
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

  /* ================= FILE INPUT ================= */
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    handleImageUpload(files[0], name);
  };

  /* ================= DRAG & DROP ================= */
  const handleDrop = (e, name) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageUpload(file, name);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.frontImg || !formData.backImg) {
      toast.error("Please upload both images");
      return;
    }

    try {
      dispatch(createProducts(formData));
      toast.success("Product Added Successfully ✅");
      setTimeout(() => navigate("/products"), 3000);
    } catch (error) {
      toast.error("Product Adding Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-zinc-900/90 border border-yellow-600/40 p-6">
        <h2 className="text-xl font-bold text-yellow-400 mb-6 text-center">
          ✨ Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <Input
            label="Discount (%)"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
          />
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

          {/* IMAGES */}
          <ImageUpload
            label="Front Image"
            name="frontImg"
            preview={preview.frontImg}
            onChange={handleImageChange}
            onDrop={handleDrop}
          />

          <ImageUpload
            label="Back Image"
            name="backImg"
            preview={preview.backImg}
            onChange={handleImageChange}
            onDrop={handleDrop}
          />

          {/* ACTIONS */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button type="reset" className="btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="btn-primary">
              {uploading ? "Uploading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>

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

/* ================= INPUT ================= */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-400">{label}</label>
    <input {...props} className="input" />
  </div>
);

/* ================= IMAGE UPLOAD ================= */
const ImageUpload = ({ label, name, preview, onChange, onDrop }) => {
  const [dragging, setDragging] = useState(false);

  return (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          setDragging(false);
          onDrop(e, name);
        }}
        className={`h-36 rounded-xl border border-dashed 
          ${
            dragging
              ? "border-yellow-400 bg-yellow-400/10"
              : "border-yellow-600/50"
          }
          flex items-center justify-center cursor-pointer bg-black/40`}
      >
        {preview ? (
          <img
            src={preview}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-yellow-400 text-xs">
            <Upload />
            <span>Drag & Drop or Click to Upload</span>
          </div>
        )}

        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default AddProductForm;
