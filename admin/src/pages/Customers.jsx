import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/auth";

export default function CustomerManager() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.authReducer?.users || []);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-yellow-500 mb-1">
          Customer Manager
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Number of Customers: {users.length}
        </p>

        {/* Customer List */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg overflow-hidden">
          {users.length === 0 && (
            <p className="text-center py-6 text-gray-400">No customers found</p>
          )}

          {users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-6 gap-4 items-center px-6 py-4
              border-b border-neutral-800 hover:bg-neutral-800 transition"
            >
              {/* Avatar + Name */}
              <div className="col-span-2 flex items-center gap-4">
                <div
                  className="p-[2px] rounded-full bg-gradient-to-br 
                  from-yellow-400 via-amber-500 to-yellow-600
                  shadow-[0_0_10px_rgba(234,179,8,0.6)]"
                >
                  <img
                    src={user.avatar}
                    alt={`${user.fname} ${user.lname}`}
                    className="w-12 h-12 rounded-full object-cover bg-black"
                  />
                </div>

                <div>
                  <p className="font-medium text-white">
                    {user.fname} {user.lname}
                  </p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>

              {/* Country & State */}
              <div>
                <p className="text-white">{user.country}</p>
                <p className="text-sm text-gray-400">{user.state}</p>
              </div>

              {/* City & Pincode */}
              <div>
                <p className="text-white">{user.city}</p>
                <p className="text-sm text-gray-400">{user.pinCode}</p>
              </div>

              {/* Phone */}
              <div className="text-white">{user.number}</div>

              {/* Delete */}
              <div className="flex justify-end">
                <button className="text-yellow-500 hover:text-red-500 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
