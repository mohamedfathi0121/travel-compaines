import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { tripStep4Schema } from "../../validations/tripStep.schema";
import { useTrip } from "../../context/TripContext";
import supabase from "../../utils/supabase";

import StepProgress from "../../components/StepProgress";
import NextButton from "../../components/next-btn";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function TripFormStep4() {
  const navigate = useNavigate();
  const { tripData } = useTrip();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the user's profile to get their associated company_id
  const { user } = useAuth(); // Assuming you have a useAuth hook to get the current user

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tripStep4Schema),
    defaultValues: tripData, // Load all previous data
  });

  const onSubmit = async data => {
    if (!user.id) {
      alert("Cannot submit: Company ID is missing.");
      return;
    }
    setIsSubmitting(true);

    const fullTrip = {
      ...tripData,
      startDate: tripData.startDate
        ? new Date(tripData.startDate).toISOString()
        : null,
      endDate: tripData.endDate
        ? new Date(tripData.endDate).toISOString()
        : null,
      priceSingle: data.priceSingle,
      priceDouble: data.priceDouble,
      priceTriple: data.priceTriple,
      priceInclude: data.inclusionsText,
      priceNotInclude: data.exclusionsText,
      companyId: user.id, // Include the fetched company ID
    };

    try {
      const { data: result, error } = await supabase.functions.invoke(
        "create-trip",
        {
          body: fullTrip,
        }
      );
      if (result.error) {
        throw new Error(result.error.message);
      }
      if (error) {
        throw new Error(error.message);
      }

      toast.success("Trip registered successfully!");
      navigate("/trips");
    } catch (err) {
      console.error("Submission failed:", err.message);
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={4} />
        <h1 className="text-2xl font-bold mb-6">Pricing and Inclusions</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Single", "Double", "Triple"].map(type => (
              <div key={type}>
                <label className="block text-sm font-medium mb-1">{`${type} Room Price`}</label>
                <input
                  type="number"
                  {...register(`price${type}`)}
                  className="w-full rounded-lg px-4 py-3 bg-input text-sm border-input"
                  disabled={isSubmitting}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              What's Included
            </label>
            <textarea
              {...register("inclusionsText")}
              rows={4}
              className="w-full rounded-lg px-4 py-3 bg-input text-sm border-input"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              What's Not Included
            </label>
            <textarea
              {...register("exclusionsText")}
              rows={4}
              className="w-full rounded-lg px-4 py-3 bg-input text-sm border-input"
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-center pt-4">
            <NextButton type="submit" disabled={isSubmitting || !user.id}>
              {isSubmitting ? "Submitting..." : "Complete Registration"}
            </NextButton>
          </div>
        </form>
      </div>
    </>
  );
}
