// LoginRegister/LoginRegister.jsx
import React, { useState } from "react";
import { FaCity, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import RoleSelection from "./RoleSelection";
import { BASE_URL } from "../../utils/constants";
import { MdAlternateEmail } from "react-icons/md";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [haveAccount, setHaveAccount] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    role: "USER", // Default role
  });

  const handleClick = () => setHaveAccount((prevVal) => !prevVal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const { name, email, password, city, role } = formData;
     if (!email || !password) {
       return toast.error("Please fill in all required fields.");
     }

     if (!haveAccount && (!name || !city)) {
       return toast.error("Please fill in all registration fields.");
     }

     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
       return toast.error("Please enter a valid email.");
     }

     if (password.length < 6) {
       return toast.error("Password should be at least 6 characters.");
     }

     
    if (haveAccount) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
          email,
          password,
        });
        toast.success(response.data.message);
        console.log("Logged in successfully");
        role === "USER" ? navigate('/userDashboard') : navigate("/adminDashboard");
        if (response.data.success) navigate("/");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Internal Server Error");
      }
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
          name,
          email,
          password,
          city,
          role,
        });
        console.log(response.ok);
        
        toast.success(response.data.message);
        if (response.ok) handleClick();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Internal Server Error");
      }
    }
  };

  return (
    <div className="h-screen w-screen font-NewAmsterdam font-bold tracking-widest bg-[#222] flex items-center justify-center text-[#3d58a0]">
      <div className="containerr relative w-4/5 h-4/5 border-2 border-[#0128C0] shadow-[0_0_25px_#0144FA] overflow-hidden">
        <div
          className={`curved-shape absolute -top-[5px] border-2 border-[#00bfff] shadow-[0_0_25px_#00bfff] w-screen h-screen bg-gradient-to-tr from-[#26c6fb] via-[#00bfff] to-[#26c6fb] transition-all duration-[1.5s] ${
            haveAccount
              ? "rotate-[10deg] skew-y-[40deg] origin-bottom-right right-0"
              : "rotate-[-10deg] skew-y-[140deg] origin-top-left right-[-180px]"
          }`}
        ></div>
        <div
          className={`form-box Login absolute top-0 ${
            haveAccount ? "left-0" : "right-0"
          } px-[40px] w-1/2 h-full flex flex-col justify-center`}
        >
          <h2 className="text-[40px] uppercase tracking-widest font-extrabold text-center">
            {haveAccount ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!haveAccount && (
              <>
                <InputField
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  label="Name"
                  icon={
                    <FaUser className="absolute top-[35%] right-4 transition-all duration-500 peer-focus:text-[#3e5fd6] peer-valid:text-[#3e5fd6]" />
                  }
                />
                <InputField
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  label="City"
                  icon={
                    <FaCity className="absolute top-[35%] right-4 transition-all duration-500 peer-focus:text-[#3d52a0] peer-valid:text-[#3d52a0]" />
                  }
                />
              </>
            )}
            <InputField
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              icon={
                <MdAlternateEmail className="absolute top-[35%] right-4 transition-all duration-500 peer-focus:text-[#3d52a0] peer-valid:text-[#3d52a0]" />
              }
            />
            <InputField
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              icon={
                <FaLock className="absolute top-[35%] right-4 transition-all duration-500 peer-focus:text-[#3d52a0] peer-valid:text-[#3d52a0]" />
              }
            />

            {!haveAccount && (
              <RoleSelection role={formData.role} onChange={handleChange} />
            )}

            <div className="input-box w-full relative mt-[25px] h-[45px]">
              <button
                style={{
                  zIndex: 10,
                }}
                className="relative bg-transparent text-[#ede8f5] overflow-hidden w-full h-[45px] cursor-pointer rounded-2xl text-[16px] font-extrabold border-2 border-[#7091e6] before:content-[''] before:absolute before:-top-full before:left-0 before:bg-gradient-to-t from-[#25252b] via-[#7091e6] to-[#25252b] before:-z-10 before:h-[300%] before:w-full before:bg-slate-600 hover:before:top-0 before:transition-all duration-500"
                type="submit"
              >
                {haveAccount ? "Login" : "Register"}
              </button>
            </div>
          </form>
          <p className="mt-[20px] text-center text-[15px] font-medium">
            {haveAccount ? (
              <span className="text-[#7091e6]">
                Don't have an account?{" "}
                <button
                  className="font-extrabold hover:underline"
                  onClick={handleClick}
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span className="text-[#7091e6]">
                Already have an account?{" "}
                <button
                  className="font-extrabold hover:underline"
                  onClick={handleClick}
                >
                  Sign In
                </button>
              </span>
            )}
          </p>
        </div>

        <div
          className={`info-content text-[#135353] absolute top-0 w-1/2 h-full ${
            haveAccount
              ? "right-0 text-right pr-[40px] pb-[60px] pl-[250px]"
              : "left-0 text-left pr-[250px] pb-[60px] pl-[40px]"
          } flex justify-center flex-col`}
        >
          <h2 className="text-[40px] leading-[1.3] font-bold font-mono">
            {haveAccount ? "WELCOME BACK!" : "WELCOME ABOARD!"}
          </h2>
          <p className="text-[16px]">
            {haveAccount
              ? "Access your profile, manage tasks, and continue where you left off."
              : "Create your profile and start exploring your new workspace."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
