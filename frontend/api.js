import axios from "axios";

const configuredApiBase =
  window.UNIFIND_CONFIG?.API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "/api";

export const API_BASE_URL = configuredApiBase.replace(/\/$/, "");
const isLocalDevelopment = ["localhost", "127.0.0.1"].includes(
  window.location.hostname
);
export const IS_DEMO_MODE =
  new URLSearchParams(window.location.search).get("demo") === "1" ||
  (!isLocalDevelopment &&
    !window.UNIFIND_CONFIG?.API_BASE_URL &&
    !import.meta.env.VITE_API_BASE_URL);

export const resolveApiAssetUrl = (value) => {
  if (!value || typeof value !== "string") return value;
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (!/^https?:\/\//i.test(API_BASE_URL)) return value;

  const backendOrigin = API_BASE_URL.replace(/\/api$/i, "");
  return new URL(value, `${backendOrigin}/`).toString();
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
