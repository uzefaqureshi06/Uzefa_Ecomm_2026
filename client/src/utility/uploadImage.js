import { toast } from "react-toastify";

const cloudName = 'dxqt7tfgl'; // Replace with your Cloudinary cloud name
const uploadPreset = 'jewelry'; // Replace with your Cloudinary upload preset

export const uploadImageToCloudinary = async (file) => {
  if (!file) return null;

  // File type validation
  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    toast.error('Only PNG, JPG, and WEBP files are allowed!');
    return null;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    toast.error('Error uploading image!');
    return null;
  }
};