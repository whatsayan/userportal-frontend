import React, { useState } from 'react';

const AddUserForm = ({ onClose, signup, setRefreshAllUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");

  const handleAddUser = async (e) => {
    // Logic to handle user creation
    e.preventDefault();
    await signup(name, email, password, city, role);
    setRefreshAllUsers(prev => !prev);
    onClose(); // Close the form after adding the user
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-300">Add New User</h2>
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
          <label className="block text-gray-400">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 bg-transparent border rounded-lg focus:outline-none text-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Role</label>
          <select
            className="w-full px-4 py-2 mt-2 bg-transparent border rounded-lg focus:outline-none text-gray-300"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option className="bg-gray-900" value="user">
              User
            </option>
            <option className="bg-gray-900" value="admin">
              Admin
            </option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
