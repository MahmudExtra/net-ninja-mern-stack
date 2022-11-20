import React, { useState } from "react";
import { useSignIn } from "../hooks/useSignIn";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading, handleSignIn } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignIn(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Sign In</h3>
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
        Sign In
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignIn;
