import axios, { AxiosInstance, AxiosResponse } from "axios";

interface User {
  id: number;
  username: string;
  email: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
}

const API_URL = "http://localhost:3003/api/auth_api/";

// Set up axios instance with token handling
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register a new user
export const register = async (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  return axiosInstance.post("register/", {
    username,
    password,
    password2: password,
  });
};

// Login user and get tokens
export const login = async (
  username: string,
  password: string
): Promise<AxiosResponse<TokenResponse>> => {
  const response = await axiosInstance.post<TokenResponse>("token/", {
    username,
    password,
  });

  if (response.data.access) {
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
  }

  return response;
};

// Logout user
export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    try {
      await axiosInstance.post("logout/", { refresh: refreshToken });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Get current user
export const getCurrentUser = async (): Promise<AxiosResponse<User>> => {
  return axiosInstance.get<User>("user/");
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("accessToken");
};
