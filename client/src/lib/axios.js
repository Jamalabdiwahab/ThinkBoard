import axios from "axios";

// in production, there's no localhost so we have to this dynamic
const BASE_URL=import.meta.env.MODE === "dev" ? "http://localhost:5000/api" :"/api"
const api=axios.create({
    baseURL:BASE_URL
})

export default api;