import React, { useState } from "react";
import Header from "../shared/Header";
import NextButton from "../next-btn";
import StepProgress from "../StepProgress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripStep2Schema } from "../../validations/tripStep.schema";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../api/uploadFile";
import { useTrip } from "../../context/TripContext";

export default function TripFormStep2() {
  const navigate = useNavigate();
  const { updateTripData } = useTrip();
  const [uploading, setUploading] = useState(false);

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tripStep2Schema),
  });

  const vrVideo = watch("vrVideo");
  const photos = watch("photos");

  const onSubmit = async data => {
    try {
      setUploading(true);

      // Upload VR video
      const videoUrl = await uploadToCloudinary(data.vrVideo, "trip_uploads");

      // Upload photos
      const photoUrls = [];
      for (const photo of data.photos) {
        const url = await uploadToCloudinary(photo, "trip_uploads");
        photoUrls.push(url);
      }

      updateTripData({
        vrVideoUrl: videoUrl,
        photoUrls: photoUrls,
      });

      console.log("Uploaded to Cloudinary:");
      console.log("Video URL:", videoUrl);
      console.log("Photo URLs:", photoUrls);

      navigate("/create-trip/step3");
    } catch (err) {
      console.error("Upload error:", err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={2} />
        <h1 className="text-2xl font-bold mb-8">Upload Your Trip Media</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* VR Video */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary">
              Upload VR Video
            </label>
            <div className="border-2 border-dashed border-input rounded-xl p-6 bg-input">
              <div className="flex flex-col items-center space-y-2 text-center">
                <p className="text-sm font-medium">
                  Drag and drop or browse to upload
                </p>
                <p className="text-xs text-text-secondary max-w-md">
                  Supported formats: MP4, AVI, MOV. Max file size: 500MB.
                </p>
                <label className="mt-3 cursor-pointer px-5 py-2 bg-button-primary text-white rounded-lg text-sm hover:bg-button-primary-hover">
                  Browse Files
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={e =>
                      setValue("vrVideo", e.target.files?.[0], {
                        shouldValidate: true,
                      })
                    }
                  />
                </label>
                {vrVideo && (
                  <p className="text-sm text-text-secondary">
                    Selected: {vrVideo.name}
                  </p>
                )}
                {errors.vrVideo && (
                  <p className="text-red-500 text-xs">
                    {errors.vrVideo.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium mb-2 text-text-secondary">
              Upload Photos
            </label>
            <div className="border-2 border-dashed border-input rounded-xl p-6 bg-input">
              <div className="flex flex-col items-center space-y-2 text-center">
                <p className="text-sm font-medium">
                  Drag and drop or browse to upload
                </p>
                <p className="text-xs text-text-secondary max-w-md">
                  Supported formats: JPG, PNG. Max file size: 5MB per photo.
                </p>
                <label className="mt-3 cursor-pointer px-5 py-2 bg-button-primary text-white rounded-lg text-sm hover:bg-button-primary-hover">
                  Browse Files
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={e =>
                      setValue("photos", Array.from(e.target.files || []), {
                        shouldValidate: true,
                      })
                    }
                  />
                </label>

                {photos?.length > 0 && (
                  <ul className="mt-2 text-sm list-disc list-inside text-left w-full max-w-md">
                    {photos.map((photo, idx) => (
                      <li key={idx}>{photo.name}</li>
                    ))}
                  </ul>
                )}
                {errors.photos && (
                  <p className="text-red-500 text-xs">
                    {errors.photos.message}
                  </p>
                )}
              </div>
            </div>
          </div>

        <div className="flex justify-between mt-10">
  <button
    type="button"
    onClick={() => navigate("/create-trip/step1")}
    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
  >
    Back
  </button>

  <NextButton type="submit" disabled={uploading}>
    {uploading ? "Uploading..." : "Next"}
  </NextButton>
</div>

        </form>
      </div>
    </>
  );
}
