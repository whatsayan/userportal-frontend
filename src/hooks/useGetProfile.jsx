import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
export const useGetProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();
    const getProfile = async (token) => {
      try {
        const response = await axios.get(`${BASE_URL}/adminuser/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const {name, username, email, city, role} = response.data.ourUsers;
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ name, username, email, city, role })
        );
        dispatch({type: "LOGIN", payload: {name, username, email, city, role}});
        console.log(response.data); // Log the actual data for better clarity
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
        throw error; // Re-throw the error to handle it in the caller function
      }
    };

    return {isLoading, error, getProfile}
}