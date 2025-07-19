import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../../context/TripContext";
import StepProgress from "../StepProgress";
import NextButton from "../next-btn";
import DatePickerCalendar from "../DatePickerCalendar";
import { useLocation } from "react-router-dom";
import { tripStep5Schema } from "../../validations/repostTrip.schema";

export default function TripFormStep5() {
  const navigate = useNavigate();
  const { tripData, updateTripData } = useTrip();
  const location = useLocation();
  const { baseTripId } = location.state || {}; // Destructure safely
  console.log("Base Trip ID:", baseTripId);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tripStep5Schema),

    defaultValues: {
      locationURL: tripData.locationURL || "",
      ticketCount: tripData.availableTickets || "",
      startDate: tripData.startDate || "",
      endDate: tripData.endDate || "",
    },
  });

  const onSubmit = data => {
    updateTripData({
      id: baseTripId,
      locationURL: data.locationURL,
      availableTickets: data.ticketCount,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    navigate("/repost-trip/step6");
  };

  return (
    <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
      <StepProgress step={1} totalSteps={2} />
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

        {/* Start Date */}
        <div className="flex flex-col">
          <label className="text-sm text-text-secondary mb-1">Start Date</label>
          <DatePickerCalendar
            selectedDate={watch("startDate")}
            onDateChange={date =>
              setValue("startDate", date, { shouldValidate: false })
            }
          />
          {errors.startDate && (
            <span className="text-red-500 text-xs mt-1">
              {errors.startDate.message}
            </span>
          )}
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="text-sm text-text-secondary mb-1">End Date</label>
          <DatePickerCalendar
            selectedDate={watch("endDate")}
            onDateChange={date =>
              setValue("endDate", date, { shouldValidate: false })
            }
          />
          {errors.endDate && (
            <span className="text-red-500 text-xs mt-1">
              {errors.endDate.message}
            </span>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end mt-10">
          <NextButton type="submit">Next</NextButton>
        </div>
      </form>
    </div>
  );
}
