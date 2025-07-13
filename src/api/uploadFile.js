// src/api/uploadFile.js

export const uploadToCloudinary = async (file, preset) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset); 

  const res = await fetch("https://api.cloudinary.com/v1_1/deqcmxf9h/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Failed to upload");
  }

  return data.secure_url; 
};
