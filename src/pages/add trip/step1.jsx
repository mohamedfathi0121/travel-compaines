import React, { useState } from "react";
import DatePickerCalendar from "../../components/DatePickerCalendar";
import Header from "../../components/shared/header";
import NextButton from "../../components/next-btn";
import StepProgress from "../../components/StepProgress";
export default function TripFormStep1() {
  const [tripTitle, setTripTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={1} />

        <h1 className="text-2xl font-bold mb-8">Basic Trip Information</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">
              Trip Title
            </label>
            <input
              type="text"
              placeholder="e.g., Summer Vacation in Europe"
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-text-secondary mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary resize-none transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-lg px-4 py-3 bg-input text-text-primary text-sm outline-none border border-input focus:border-btn-primary transition"
            >
              <option value="">Select Country</option>
              <option value="egypt">Egypt</option>
              <option value="germany">Germany</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-lg px-4 py-3 bg-input text-text-primary text-sm outline-none border border-input focus:border-btn-primary transition"
            >
              <option value="">Select City</option>
              <option value="cairo">Cairo</option>
              <option value="berlin">Berlin</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">
              Start Date
            </label>
            <DatePickerCalendar
              selectedDate={startDate}
              onDateChange={setStartDate}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-text-secondary mb-1">End Date</label>
            <DatePickerCalendar
              selectedDate={endDate}
              onDateChange={setEndDate}
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <NextButton>Next</NextButton>
        </div>
      </div>
    </>
  );
}
