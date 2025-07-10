import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripStep4Schema } from "../../validations/tripStep.schema";
import Header from "../../components/shared/header";
import StepProgress from "../../components/StepProgress";
import NextButton from "../../components/next-btn";

export default function TripFormStep4() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tripStep4Schema),
    defaultValues: {
      price: "",
      inclusions: ["Hotel"],
      exclusions: ["Flights"],
    },
  });

  const [newInclude, setNewInclude] = useState("");
  const [newExclude, setNewExclude] = useState("");

  const inclusions = watch("inclusions");
  const exclusions = watch("exclusions");

  const addInclusion = () => {
    if (newInclude.trim()) {
      setValue("inclusions", [...inclusions, newInclude], { shouldValidate: true });
      setNewInclude("");
    }
  };

  const addExclusion = () => {
    if (newExclude.trim()) {
      setValue("exclusions", [...exclusions, newExclude], { shouldValidate: true });
      setNewExclude("");
    }
  };

  const onSubmit = (data) => {
    console.log("Step 4 Data:", data);
    alert("Trip registered successfully!");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={4} />
        <h1 className="text-2xl font-bold mb-6">Pricing and Inclusions</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Trip Price */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Trip Price (USD)
            </label>
            <input
              type="number"
              {...register("price")}
              className="w-full rounded-lg px-4 py-3 bg-input text-text-primary placeholder:text-text-secondary text-sm outline-none border border-input focus:border-btn-primary transition"
              placeholder="Enter trip price"
            />
            {errors.price && (
              <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>
            )}
          </div>

          {/* Inclusions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              What's Included
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newInclude}
                onChange={(e) => setNewInclude(e.target.value)}
                className="flex-1 rounded-lg px-4 py-2 bg-input text-sm outline-none border border-input focus:border-btn-primary"
                placeholder="e.g., Meals"
              />
              <button
                type="button"
                onClick={addInclusion}
                className="px-4 py-2 bg-btn-primary text-white rounded-lg hover:bg-btn-primary-hover transition"
              >
                Add
              </button>
            </div>
            <ul className="list-disc list-inside text-sm text-text-primary">
              {inclusions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {errors.inclusions && (
              <span className="text-red-500 text-xs mt-1">{errors.inclusions.message}</span>
            )}
          </div>

          {/* Exclusions */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              What's Not Included
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newExclude}
                onChange={(e) => setNewExclude(e.target.value)}
                className="flex-1 rounded-lg px-4 py-2 bg-input text-sm outline-none border border-input focus:border-btn-primary"
                placeholder="e.g., Flights"
              />
              <button
                type="button"
                onClick={addExclusion}
                className="px-4 py-2 bg-btn-primary text-white rounded-lg hover:bg-btn-primary-hover transition"
              >
                Add
              </button>
            </div>
            <ul className="list-disc list-inside text-sm text-text-primary">
              {exclusions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            {errors.exclusions && (
              <span className="text-red-500 text-xs mt-1">{errors.exclusions.message}</span>
            )}
          </div>

          <div className="flex justify-center">
            <NextButton type="submit">Complete registration</NextButton>
          </div>
        </form>
      </div>
    </>
  );
}
