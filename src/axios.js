import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000"
})

export default axiosInstance

// To test on local machine
// http://localhost:5000