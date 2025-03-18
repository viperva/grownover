import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { register } from "../../services/authServices";

interface ErrorResponse {
  username?: string[];
  password?: string[];
  password2?: string[];
  [key: string]: string[] | undefined;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await register(username, password);
      navigate("/login");
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;

      if (errorData) {
        if (errorData.username) {
          setError(errorData.username[0]);
        } else if (errorData.password) {
          setError(errorData.password[0]);
        } else if (errorData.password2) {
          setError(errorData.password2[0]);
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password:</label>
          <input type="password" id="password2" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
