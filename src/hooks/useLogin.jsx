import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "./useGetProfile";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { getProfile } = useGetProfile();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200 && response.data?.token) {
        const { token, role, message } = response.data;

        // Save token to localStorage
        localStorage.setItem("token", token);
        
        // Fetch user profile
        try {
          await getProfile(token);
          role === "USER" ? navigate("/") : navigate("/adminDashboard");
          toast.success(message);
        } catch (profileError) {
          console.error("Profile fetch error:", profileError);
          toast.error("Failed to fetch user profile. Try again later.");
        }
      } else {
        const errorMsg = response.data?.error || "Failed to log in.";
        throw new Error(errorMsg);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "An unknown error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
