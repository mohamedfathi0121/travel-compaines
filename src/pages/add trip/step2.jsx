import React, { useState } from "react";
import Header from "../../components/shared/header";
import NextButton from "../../components/next-btn";
import StepProgress from "../../components/StepProgress";
export default function TripFormStep2() {
  const [vrVideo, setVrVideo] = useState(null);
  const [photos, setPhotos] = useState([]);

  const handleVrVideoChange = (e) => {
    setVrVideo(e.target.files[0]);
  };

  const handlePhotosChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={2} />

        <h1 className="text-2xl font-bold mb-8">Upload Your Trip Media</h1>

        <div className="space-y-8">
          <label className="block text-sm text-text-secondary font-medium mb-2">
            Upload VR Video
          </label>
          <div className="border-2 border-dashed border-input rounded-xl p-6 bg-input">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <p className="text-sm font-medium">
                Drag and drop or browse to upload
              </p>
              <p className="text-xs text-text-secondary max-w-md">
                Upload a VR video of your trip to give viewers an immersive
                experience. Supported formats: MP4, AVI, MOV. Max file size:
                500MB.
              </p>
              <label className="mt-3 cursor-pointer px-5 py-2 bg-button-primary text-white rounded-lg text-sm hover:bg-button-primary-hover">
                Browse Files
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVrVideoChange}
                  className="hidden"
                />
              </label>
              {vrVideo && (
                <p className="text-sm text-text-secondary">
                  Selected: {vrVideo.name}
                </p>
              )}
            </div>
          </div>
          <label className="block text-sm text-text-secondary font-medium mb-2">
            Upload Photos
          </label>
          <div className="border-2 border-dashed border-input rounded-xl p-6 bg-input">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <p className="text-sm font-medium">
                Drag and drop or browse to upload
              </p>
              <p className="text-xs text-text-secondary max-w-md">
                Upload photos to showcase highlights of your trip. Supported
                formats: JPG, PNG. Max file size: 5MB per photo.
              </p>
              <label className="mt-3 cursor-pointer px-5 py-2 bg-button-primary text-white rounded-lg text-sm hover:bg-button-primary-hover">
                Browse Files
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotosChange}
                  className="hidden"
                />
              </label>
              {photos.length > 0 && (
                <ul className="mt-2 text-sm list-disc list-inside text-left w-full max-w-md">
                  {photos.map((photo, idx) => (
                    <li key={idx}>{photo.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <NextButton>Next</NextButton>
        </div>
      </div>
    </>
  );
}
