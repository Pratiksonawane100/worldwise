import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; // Assuming the CSS is in a file named Signup.css

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.text();
      if (response.ok) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          navigate("/login");
        }, 3000);
      } else {
        alert(`Signup failed: ${data}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <Link to="/login" className="signup-link">
        Already have an account? Log in
      </Link>
      {showNotification && (
        <div className="notification">Signup successful!</div>
      )}
    </div>
  );
}

export default Signup;
