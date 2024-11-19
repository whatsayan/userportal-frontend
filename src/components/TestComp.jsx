import React, { useState } from "react";

const TestComp = () => {
  const [isNotEmpty, setIsNotEmpty] = useState(false);

  const handleInputChange = (e) => {
    setIsNotEmpty(e.target.value !== "");
  };

  return (
    <div className="bg-pink-600 h-screen w-screen flex justify-center items-center">
      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleInputChange}
          className={`peer w-full border-b-2 border-gray-300 bg-transparent px-2 py-2 text-gray-200 focus:outline-none focus:border-green-500 placeholder-transparent ${
            isNotEmpty ? "peer-not-empty" : ""
          }`}
          placeholder="Email Address"
          // autoComplete="off"
          required
        />
        <label
          htmlFor="email"
          className={`absolute left-2 top-2 transition-all duration-300 transform ${
            isNotEmpty
              ? "text-green-500 -translate-y-6 scale-75"
              : "text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          } font-bold origin-left`}
        >
          Email Address
        </label>
      </div>
    </div>
  );
};

export default TestComp;
