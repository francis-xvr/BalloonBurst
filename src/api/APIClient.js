import axios from "axios";

export const apiClient =axios.create(
    {
        baseURL: "http://13.233.201.160:8080"
    }
)