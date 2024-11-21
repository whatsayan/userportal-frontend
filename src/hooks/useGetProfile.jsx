import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const useGetProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const getProfile = async (token) => {
    setIsLoading(true);
    setError(null); // Reset error state before the call

    try {
      const response = await axios.get(`${BASE_URL}/adminuser/get-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.ourUsers) {
        const { id, name, username, email, city, role } =
          response.data.ourUsers;

        // Save user data to local storage
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ id, name, username, email, city, role })
        );

        // Update context state
        dispatch({
          type: "LOGIN",
          payload: { id, name, username, email, city, role },
        });

        console.log("Fetched profile:", response.data);
      } else {
        throw new Error("Unexpected response structure.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      setError(errorMessage);
      console.error("Error fetching profile:", errorMessage);
      throw error; // Re-throw for further handling
    } finally {
      setIsLoading(false); // Ensure loading is stopped in both success and error cases
    }
  };

  return { isLoading, error, getProfile };
};
