import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useTrip } from "../../context/TripContext"; // 1. Import useTrip
import { tripStep3Schema } from "../../validations/tripStep.schema";
import Header from "../../components/shared/Header";
import StepProgress from "../../components/StepProgress";
import NextButton from "../../components/next-btn";

export default function TripFormStep3() {
  const navigate = useNavigate();
  const { tripData, updateTripData } = useTrip(); // 2. Get data and the update function from context

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tripStep3Schema),
    // 3. Set default values from the context to repopulate the form
    defaultValues: {
      locationURL: tripData.locationURL || "",
      ticketCount: tripData.availableTickets || "",
    },
  });

  const onSubmit = data => {
    // 4. Save the form data to the shared context
    updateTripData({
      locationURL: data.locationURL,
      availableTickets: data.ticketCount,
    });
    // 5. Navigate to the next step
    navigate("/create-trip/step4");
  };

  return (
    <>
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={3} />
        <h1 className="text-2xl font-bold mb-8">Location and Availability</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Location URL */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-text-secondary mb-1">
              Location URL
            </label>
            <input
              {...register("locationURL")}
              type="url"
              placeholder="https://maps.google.com/..."
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
            />
            {errors.locationURL && (
              <span className="text-red-500 text-xs mt-1">
                {errors.locationURL.message}
              </span>
            )}
          </div>

          {/* Ticket Count */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-text-secondary mb-1">
              Number of Tickets Available
            </label>
            <input
              {...register("ticketCount")}
              type="number"
              placeholder="e.g. 100"
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
            />
            {errors.ticketCount && (
              <span className="text-red-500 text-xs mt-1">
                {errors.ticketCount.message}
              </span>
            )}
          </div>

           <div className="flex justify-between mt-10">
  <button
    type="button"
    onClick={() => navigate("/create-trip/step2")}
    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
  >
    Back
  </button>
            <NextButton type="submit">Next</NextButton>
          </div>
        </form>
      </div>
    </>
  );
}
