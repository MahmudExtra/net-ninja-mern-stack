import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// AuthContextProvider;
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within a useAuthContextProvider"
    );
  }
  return context;
};
