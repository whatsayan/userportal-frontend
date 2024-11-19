import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export const useSignUp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password, city, role) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, city, role })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            setIsLoading(false);
            // Optional: Dispatch action to update auth state
            // dispatch({ type: "SIGNUP", payload: json });
            navigate("/login");
        }
    };

    return { signup, isLoading, error };
};
