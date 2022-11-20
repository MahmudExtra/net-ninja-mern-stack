import React, { useState } from "react";
import { useSignUp } from "../hooks/useSugnUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const { error, loading, handleSignUp } = useSignUp();
  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignUp(username, email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loading} type="submit">
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
