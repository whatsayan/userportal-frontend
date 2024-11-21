import React from "react";

const InputField = ({
  name,
  type,
  value,
  onChange,
  icon,
  label,
  required = true,
}) => (
  <div className="input-box relative mt-6 h-12">
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-full rounded-full transition-all duration-300 bg-transparent pl-5 pr-10 outline-none text-sm md:text-base border-2 border-[#8697c4] font-extrabold peer focus:border-[#7091e6]"
      id={name}
      type={type}
      aria-label={label}
      required={required}
    />
    <label
      className="absolute left-5 uppercase transition-all text-[#3d52a0] font-bold duration-500 top-1/2 -translate-y-1/2 peer-focus:-top-3 peer-focus:text-[#7091e6] peer-valid:-top-3 peer-valid:text-[#7091e6]"
      htmlFor={name}
    >
      {label}
    </label>
    <div>{icon}</div>
  </div>
);

export default InputField;
