import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useUsersContext } from "./useUsersContext";

export const useGetAllUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useUsersContext();

  const getAllUsers = async () => {
    const token = localStorage.getItem("token") // Parse if stored as JSON

    if (!token) {
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    setIsLoading(true);
    setError(null); // Reset error state

    try {
      const response = await axios.get(`${BASE_URL}/admin/get-all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.ourUsersList) {
        const data = response.data.ourUsersList.map(
          ({ id, name, username, city, email, role }) => ({
            id,
            name,
            username,
            city,
            email,
            role,
          })
        );

        dispatch({
          type: "ALLUSERS",
          payload: data,
        });
      } else {
        throw new Error("Unexpected response structure.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "An error occurred."
      );
      console.error(
        "Error getting all users:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false); // Ensure loading is stopped
    }
  };

  return { isLoading, error, getAllUsers };
};
