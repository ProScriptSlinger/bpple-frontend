import axios from "axios";
import { toast } from "react-toastify";
// Base URL of your backend API
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`; // Replace with your actual backend API URL

// Register a new user
// handleEndpoint(userData,endpoint, method, token)

const handleEndpoint = async (userData, endpoint, method, token) => {
  const bippleToken = localStorage.getItem("bipple_token");
  try {
    const config = {
      method: method.toUpperCase(),
      url: `${API_BASE_URL}/${endpoint}`,
      data: method.toUpperCase() !== "GET" ? userData : null,
      headers: {
        authorization: `Bearer ${bippleToken}`,
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    // Handle different types of errors or provide specific error messages
    if (error.response) {
      toast.error(error.response.data.error);
      // The request was made and the server responded with a status code
      // Handle specific status codes if needed
      console.log("Error -------->", error);
      throw new Error(error || "Request failed");
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("No response received from server");
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an error
      toast.error("Error setting up the request");
      throw new Error("Error setting up the request");
    }
  }
};

export { handleEndpoint };
