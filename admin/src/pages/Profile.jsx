import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center items-start p-6">
      <div className="w-full max-w-3xl p-10">
        {/* PROFILE SECTION */}
        <div className="flex flex-col items-center">
          {/* PROFILE IMAGE */}
          <div className="w-44 h-44 rounded-full border-4 border-yellow-500 overflow-hidden shadow-lg">
            <img
              src="https://res.cloudinary.com/dxqt7tfgl/image/upload/v1749013216/ynniuecslqywh7fchazf.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* NAME */}
          <h2 className="mt-6 text-3xl font-semibold text-yellow-400">
            Uzefa Qureshi
          </h2>

          {/* EMAIL */}
          <p className="text-gray-400 text-base mt-1">uzefa06@gmail.com</p>

          {/* ROLE & COUNTRY */}
          <div className="mt-4 flex items-center gap-4">
            <span className="px-5 py-1.5 text-sm rounded-full bg-yellow-500 text-black font-semibold">
              ADMIN
            </span>
            <span className="text-sm text-gray-400">Country: India</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-yellow-700/30 my-8"></div>

        {/* ABOUT */}
        <p className="text-center text-gray-300 text-base leading-relaxed px-6">
          Inspired by royal dynasties and ancient traditions, Indian jewellery
          showcases exquisite detailing and unmatched craftsmanship. Worn during
          grand celebrations, it adds grace, elegance, and a touch of royalty to
          every occasion.
        </p>

        {/* SHOW MORE */}
        <div className="text-center mt-6">
          <button className="text-yellow-400 hover:text-yellow-300 text-sm underline">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
