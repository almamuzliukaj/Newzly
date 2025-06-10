// Set the base URL for the API using environment variables or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api";

export default API_BASE_URL;
