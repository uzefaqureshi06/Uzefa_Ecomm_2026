import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminAuth } from "../redux/api";
const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(adminAuth(formData));
    } catch (error) {
      console.log(error);
    }
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="relative w-[90%] max-w-md rounded-2xl border border-yellow-500/40 bg-zinc-900/60 backdrop-blur-xl shadow-[0_0_40px_rgba(234,179,8,0.15)] p-8">
        <h2 className="text-center text-yellow-400 text-xl font-semibold mb-6">
          Sign In
        </h2>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-xl bg-zinc-800/60 border border-zinc-700 px-4 py-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-yellow-500 py-3 text-black font-semibold text-lg hover:bg-yellow-400 active:scale-[0.98] transition-all"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Auth;
