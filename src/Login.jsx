import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Ensure CSS is in Login.css

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    success: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setNotification({
          show: true,
          message: "Login successful!",
          success: true,
        });
        setTimeout(() => {
          setIsAuthenticated(true);
          setNotification({ show: false, message: "", success: false });
        }, 3000);
      } else {
        setNotification({
          show: true,
          message: "Wrong password. Please try again.",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setNotification({
        show: true,
        message: "Login failed. Please try again.",
        success: false,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <Link to="/signup" className="signup-link">
        Don't have an account? Sign up
      </Link>
      {notification.show && (
        <div
          className={`notification ${
            notification.success ? "success" : "error"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default Login;
