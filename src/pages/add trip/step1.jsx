import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { tripStep1Schema } from "../../validations/tripStep.schema";
import { getAllCountries, getCitiesByCountry } from "../../api/locationApi";
import Header from "../../components/shared/Header";
import StepProgress from "../../components/StepProgress";
import DatePickerCalendar from "../../components/DatePickerCalendar";
import NextButton from "../../components/next-btn";
import { useTrip } from "../../context/TripContext";
import Select from "react-select";

export default function TripFormStep1() {
  const navigate = useNavigate();
  const { tripData, updateTripData } = useTrip();

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tripStep1Schema),
    defaultValues: {
      tripTitle: tripData.title || "",
      description: tripData.description || "",
      country: tripData.country || "",
      city: tripData.city || "",
      startDate: tripData.startDate || "",
      endDate: tripData.endDate || "",
    },
  });

  const selectedCountry = watch("country");

  useEffect(() => {
    getAllCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    setLoadingCities(true);
    getCitiesByCountry(selectedCountry)
      .then(setCities)
      .finally(() => setLoadingCities(false));
  }, [selectedCountry]);

  const countryOptions = countries.map(c => ({ value: c, label: c }));
  const cityOptions = cities.map(c => ({ value: c, label: c }));

  const onSubmit = data => {
    updateTripData({
      title: data.tripTitle,
      description: data.description,
      country: data.country,
      city: data.city,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    navigate("/create-trip/step2");
  };

  return (
    <>
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={1} />
        <h1 className="text-2xl font-bold mb-8">Basic Trip Information</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Trip Title */}
          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">
              Trip Title
            </label>
            <input
              {...register("tripTitle")}
              placeholder="e.g., Summer Vacation in Europe"
              className="rounded-lg px-4 py-3 bg-input text-sm border border-input focus:border-btn-primary"
            />
            {errors.tripTitle && (
              <span className="text-red-500 text-xs mt-1">
                {errors.tripTitle.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-text-secondary mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="4"
              className="rounded-lg px-4 py-3 bg-input text-sm border border-input focus:border-btn-primary resize-none"
            />
            {errors.description && (
              <span className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">Country</label>
            <Select
              options={countryOptions}
              value={countryOptions.find(opt => opt.value === selectedCountry)}
              onChange={option =>
                setValue("country", option?.value || "", {
                  shouldValidate: true,
                })
              }
              placeholder="Select Country"
              className="text-sm"
            />
            {errors.country && (
              <span className="text-red-500 text-xs mt-1">
                {errors.country.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">City</label>
            <Select
              options={cityOptions}
              value={cityOptions.find(opt => opt.value === watch("city"))}
              onChange={option =>
                setValue("city", option?.value || "", { shouldValidate: true })
              }
              placeholder="Select City"
              isDisabled={loadingCities || !selectedCountry}
              className="text-sm"
              isLoading={loadingCities}
            />
            {errors.city && (
              <span className="text-red-500 text-xs mt-1">
                {errors.city.message}
              </span>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">
              Start Date
            </label>
            <DatePickerCalendar
              selectedDate={watch("startDate")}
              onDateChange={date =>
                setValue("startDate", date, { shouldValidate: true })
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
                setValue("endDate", date, { shouldValidate: true })
              }
            />
            {errors.endDate && (
              <span className="text-red-500 text-xs mt-1">
                {errors.endDate.message}
              </span>
            )}
          </div>

          {/* Next Button */}
          <div className="md:col-span-2 flex justify-end mt-8">
            <NextButton type="submit">Next</NextButton>
          </div>
        </form>
      </div>
    </>
  );
}
