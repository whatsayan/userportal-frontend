import React, { useState } from "react";

const UpdateUserForm = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username || ""); // Assuming username is optional in the original data
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city || ""); // Assuming city is optional in the original data

  const handleUpdateUser = () => {
    // Logic to handle updating user details
    console.log({
      id: user.id,
      name,
      username,
      email,
      city,
    });
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
          <label className="block text-gray-400">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 bg-transparent border rounded-lg focus:outline-none text-gray-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleUpdateUser}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserForm;
