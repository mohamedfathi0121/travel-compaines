// src/pages/TripFormStep3.jsx
import React, { useState } from "react";
import Header from "../../components/shared/header";
import NextButton from "../../components/next-btn";
import StepProgress from "../../components/StepProgress";
export default function TripFormStep3() {
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={3} />

        <h1 className="text-2xl font-bold mb-8">Contact & Social Media</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">
              Contact Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
            />
          </div>

          {/* Contact Phone */}
          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+123 456 7890"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
            />
          </div>

          {/* Facebook */}
          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">Facebook</label>
            <input
              type="url"
              placeholder="https://facebook.com/yourprofile"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
            />
          </div>

          {/* Instagram */}
          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">
              Instagram
            </label>
            <input
              type="url"
              placeholder="https://instagram.com/yourprofile"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
            />
          </div>

          {/* Website */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-text-secondary mb-1">
              Website (optional)
            </label>
            <input
              type="url"
              placeholder="https://yourwebsite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
            />
          </div>
        </div>

        <div className="flex justify-end mt-25">
          <NextButton>Next</NextButton>
        </div>
      </div>
    </>
  );
}
