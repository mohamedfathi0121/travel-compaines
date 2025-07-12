

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { tripStep1Schema } from "../../validations/tripStep.schema";
import Header from "../../components/shared/header";
import StepProgress from "../../components/StepProgress";
import DatePickerCalendar from "../../components/DatePickerCalendar";
import NextButton from "../../components/next-btn";


export default function TripFormStep1() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tripStep1Schema),
    defaultValues: {
      tripTitle: "",
      description: "",
      country: "",
      city: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data) => {
    console.log("✅ Step 1 data:", data);
    navigate("/step2");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={1} />
        <h1 className="text-2xl font-bold mb-8">Basic Trip Information</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">Trip Title</label>
            <input
              {...register("tripTitle")}
              placeholder="e.g., Summer Vacation in Europe"
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
            />
            {errors.tripTitle && <span className="text-red-500 text-xs mt-1">{errors.tripTitle.message}</span>}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-text-secondary mb-1">Description</label>
            <textarea
              {...register("description")}
              rows="4"
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary resize-none transition"
            />
            {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">Country</label>
            <select
              {...register("country")}
              className="rounded-lg px-4 py-3 bg-input text-text-primary text-sm outline-none border border-input focus:border-btn-primary transition"
            >
              <option value="">Select Country</option>
              <option value="egypt">Egypt</option>
              <option value="germany">Germany</option>
            </select>
            {errors.country && <span className="text-red-500 text-xs mt-1">{errors.country.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">City</label>
            <select
              {...register("city")}
              className="rounded-lg px-4 py-3 bg-input text-text-primary text-sm outline-none border border-input focus:border-btn-primary transition"
            >
              <option value="">Select City</option>
              <option value="cairo">Cairo</option>
              <option value="berlin">Berlin</option>
            </select>
            {errors.city && <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">Start Date</label>
            <DatePickerCalendar
              selectedDate={watch("startDate")}
              onDateChange={(date) => setValue("startDate", date, { shouldValidate: true })}
            />
            {errors.startDate && <span className="text-red-500 text-xs mt-1">{errors.startDate.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">End Date</label>
            <DatePickerCalendar
              selectedDate={watch("endDate")}
              onDateChange={(date) => setValue("endDate", date, { shouldValidate: true })}
            />
            {errors.endDate && <span className="text-red-500 text-xs mt-1">{errors.endDate.message}</span>}
          </div>

          <div className="md:col-span-2 flex justify-end mt-8">
            <NextButton type="submit">Next</NextButton>
          </div>
        </form>
      </div>
    </>
  );
}
