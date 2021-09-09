import axios from "axios";

const UPLOAD_ROUTE = "/api/upload";

export const uploadImage = ({ image }) => {
  const formData = new FormData();
  formData.append("image", image);

  return axios.post(UPLOAD_ROUTE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
