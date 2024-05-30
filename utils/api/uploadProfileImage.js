import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

export const uploadProfileImage = async (userId, image) => {
  try {
    if (!image) {
      throw new Error("Image data is missing");
    }

    const formData = new FormData();
    formData.append("profile_image", image);

    const response = await axios.post(
      `${API_BASE_URL}/user/uploadprofileAvater/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Upload successful:", response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Handle server validation errors
      console.error("Server validation error:", error.response.data);
    } else {
      console.error("Error uploading profile image:", error.message);
    }
    throw new Error("Error uploading profile image");
  }
};
