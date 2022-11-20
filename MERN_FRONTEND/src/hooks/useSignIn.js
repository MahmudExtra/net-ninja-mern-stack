import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// useAuthContext;
export const useSignIn = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.error);
      }
      if (response.ok) {
        // save the user in the local storage
        localStorage.setItem("user", JSON.stringify(data));
        // dispatch the user to the auth context
        dispatch({ type: "LOGIN", payload: data });
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleSignIn };
};
