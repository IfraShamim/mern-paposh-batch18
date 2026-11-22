import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(name, email, password);

      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>
    </div>
  );
}

export default Signup;