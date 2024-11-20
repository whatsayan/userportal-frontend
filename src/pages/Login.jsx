// Login/Login.jsx
import React, { useState } from "react";
import { FaCity, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField.jsx";
import { MdAlternateEmail } from "react-icons/md";
import { BASE_URL } from "../utils/constants";
import RoleSelection from "../components/RoleSelection.jsx";

const Login = () => {
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
        console.log(response);
        
        toast.success(response.data.message);
        if (response.ok) handleClick();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Internal Server Error");
      }
    }
  };

  return (
    <div className="h-screen w-screen font-NewAmsterdam font-bold tracking-widest bg-[#1c1c1c] flex items-center justify-center text-[#5c8eda]">
      <div className="flex justify-center flex-col gap-5 md:block relative md:w-4/5 md:h-4/5 h-[90dvh] w-[95vw] rounded-xl border-2 border-[#3ec9b0] md:shadow-[0_0_25px_#4bd9c7] shadow-[inset_0_0_25px_#4bd9c7] overflow-hidden">
        {/* Curved Shape */}
        {/* <div
          className={`hidden md:block curved-shape absolute -top-[5px] border-2 border-[#1eaedb] shadow-[0_0_25px_#1eaedb] w-screen h-screen bg-gradient-to-tr from-[#1e88e5] via-[#29b6f6] to-[#1e88e5] transition-all duration-[1.5s] ${
            haveAccount
              ? "rotate-[10deg] skew-y-[40deg] origin-bottom-right right-0"
              : "rotate-[-10deg] skew-y-[140deg] origin-top-left right-[-180px]"
          }`}
        ></div> */}

        {/* Form Box */}
        <div
          className={`form-box Login md:absolute ${
            haveAccount ? "md:left-0" : "md:right-0"
          } px-[40px] w-full h-fit md:w-1/2 md:h-full flex flex-col justify-center`}
        >
          <h2 className="text-[40px] uppercase tracking-widest font-extrabold text-center text-[#5c8eda]">
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
                    <FaUser className="absolute top-[35%] right-4 transition-all duration-500 peer-focus:text-[#6094ec] peer-valid:text-[#6094ec]" />
                  }
                />
                <InputField
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  label="City"
                  icon={
                    <FaCity className="absolute top-[35%] right-4 transition-all duration-500 peer-focus:text-[#6094ec] peer-valid:text-[#6094ec]" />
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
                <MdAlternateEmail className="absolute top-[35%] right-4 transition-all duration-500 peer-focus:text-[#6094ec] peer-valid:text-[#6094ec]" />
              }
            />
            <InputField
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              icon={
                <FaLock className="absolute top-[35%] right-4 transition-all duration-500 peer-focus:text-[#6094ec] peer-valid:text-[#6094ec]" />
              }
            />

            {!haveAccount && (
              <RoleSelection role={formData.role} onChange={handleChange} />
            )}

            <div className="input-box w-full relative mt-5 md:mt-[45px] h-[45px]">
              <button
                style={{ zIndex: 10 }}
                className="relative bg-transparent text-[#f1f7fc] overflow-hidden w-full h-[45px] cursor-pointer rounded-2xl text-[16px] font-extrabold border-2 border-[#7392f1] before:content-[''] before:absolute before:-top-full before:left-0 before:bg-gradient-to-t from-[#1e1e1e] via-[#013def] to-[#1e1e1e] before:-z-10 before:h-[300%] before:w-full hover:before:top-0 before:transition-all duration-500"
                type="submit"
              >
                {haveAccount ? "Login" : "Register"}
              </button>
            </div>
          </form>
          <p className="mt-[20px] text-center text-[15px] font-medium text-[#c5e4fa]">
            {haveAccount ? (
              <span>
                Don't have an account?{" "}
                <button
                  className="font-extrabold hover:underline text-[#5c8eda]"
                  onClick={handleClick}
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  className="font-extrabold hover:underline text-[#5c8eda]"
                  onClick={handleClick}
                >
                  Sign In
                </button>
              </span>
            )}
          </p>
        </div>

        {/* Info Section */}
        <div
          className={`info-content text-[#3ec9b0] md:absolute md:top-0 w-full md:w-1/2 h-fit md:h-full ${
            haveAccount
              ? "md:right-0 md:text-right md:pr-[40px] md:pb-[60px] md:pl-[250px]"
              : "md:left-0 md:text-left md:pr-[250px] md:pb-[60px] md:pl-[40px]"
          } flex justify-center text-center flex-col`}
        >
          <h2 className="text-xl md:text-[40px] leading-[1.3] font-bold font-mono">
            {haveAccount ? "WELCOME BACK!" : "WELCOME ABOARD!"}
          </h2>
          <p className="text-xs px-5 md:px-0 md:text-[16px] text-[#a1d5e8]">
            {haveAccount
              ? "Access your profile, manage tasks, and continue where you left off."
              : "Create your profile and start exploring your new workspace."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
