import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";

export const useSignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (name, email, password, city, role) => {
        setIsLoading(true);
        setError(null);

        const response = await axios.post(`${BASE_URL}/auth/register`, {
          name,
          email,
          password,
          city,
          role,
        });

        if (response.status != 200) {
            setIsLoading(false);
            setError(response.error || " Failed to Sign In ");
        }

        if (response.status == 200) {
            toast.success(response.data.message);
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
