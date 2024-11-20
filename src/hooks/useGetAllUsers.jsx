import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useUsersContext } from "./useUsersContext";
export const useGetAllUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useUsersContext();
  const getAllUsers = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.ourUsersList.map(({ name, username, city, email, role }) => ({
          name,
          username,
          city,
          email,
          role,
        }));
        // console.log(data);
      dispatch({
        type: "ALLUSERS",
        payload: data,
      });
    //   console.log(response.data); // Log the actual data for better clarity
    } catch (error) {
      console.error(
        "Error getting all users:",
        error.response?.data || error.message
      );
      throw error; // Re-throw the error to handle it in the caller function
    }
  };

  return { isLoading, error, getAllUsers };
};
