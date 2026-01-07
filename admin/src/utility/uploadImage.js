import { toast } from "react-toastify";

const cloudName = "dxqt7tfgl";
const uploadPreset = "jewelry";

export const uploadImageToCloudinary = async (file) => {
  if (!file) return null;

  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    toast.error("Only PNG, JPG, and WEBP files are allowed!");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error(err);
    toast.error("Image upload failed");
    return null;
  }
};
