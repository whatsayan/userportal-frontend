import React, { useState } from "react";
import RoleSelection from "./RoleSelection";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UpdateUserForm = ({ user, onClose, setRefreshAllUsers }) => {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password || ""); // Assuming password is optional in the original data
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [city, setCity] = useState(user.city || ""); // Assuming city is optional in the original data
  const handleUpdateUser = async (id) => {
    // Logic to handle updating user details
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized to update!");
      }
      const response = await axios.put(
        `${BASE_URL}/admin/update/${id}`,
        {
          name,
          email,
          password,
          city,
          role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRefreshAllUsers(prev => !prev)
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
    onClose(); // Close the form after updating
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-300">Update User</h2>
        <div className="mb-4">
          <label className="block text-gray-400">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 bg-transparent border rounded-lg focus:outline-none text-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 bg-transparent border rounded-lg focus:outline-none text-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 bg-transparent border rounded-lg focus:outline-none text-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">City</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 bg-transparent border rounded-lg focus:outline-none text-gray-300"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <RoleSelection role={role} onChange={(e) => setRole(e.target.value)} />
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => handleUpdateUser(user.id)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserForm;
