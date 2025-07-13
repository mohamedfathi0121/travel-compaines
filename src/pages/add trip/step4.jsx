import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripStep4Schema } from "../../validations/tripStep.schema";
import Header from "../../components/shared/header";
import StepProgress from "../../components/StepProgress";
import NextButton from "../../components/next-btn";
import { useTrip } from "../../context/TripContext";
import supabase from "../../utils/supabase";

export default function TripFormStep4() {
  const { tripData, updateTripData } = useTrip();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tripStep4Schema),
    defaultValues: {
      priceSingle: tripData.priceSingle || "",
      priceDouble: tripData.priceDouble || "",
      priceTriple: tripData.priceTriple || "",
      inclusionsText: tripData.priceInclude || "",
      exclusionsText: tripData.priceNotInclude || "",
    },
  });

const onSubmit = async (data) => {
  const fullTrip = {
    ...tripData,
    priceSingle: data.priceSingle,
    priceDouble: data.priceDouble,
    priceTriple: data.priceTriple,
    priceInclude: data.inclusionsText,
    priceNotInclude: data.exclusionsText,
  };

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("Failed to get authenticated user.");
    return;
  }

  fullTrip.company_id = user.id;
  updateTripData(fullTrip);

  const formData = new FormData();
  Object.entries(fullTrip).forEach(([key, value]) => {
    const finalKey = key;

    if (key === "photos" && Array.isArray(value)) {
      value.forEach((file) => formData.append("photos", file));
    } else if (key === "photoUrls" && Array.isArray(value)) {
      formData.append(finalKey, JSON.stringify(value));
    } else {
      formData.append(finalKey, value?.toString() || "");
    }
  });

  console.log("📦 FormData being sent:");
  for (const pair of formData.entries()) {
    console.log(pair[0], "=>", pair[1]);
  }

  const accessToken = localStorage.getItem("access_token"); 

  try {
    const res = await fetch("https://iklzpmnhifxwgmqydths.supabase.co/functions/v1/create-trip", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    });

    const resultText = await res.text();
    console.log("Status:", res.status);
    console.log("Response OK:", res.ok);
    console.log("Raw response text:", resultText);

    if (!res.ok) throw new Error(`Supabase Error: ${resultText}`);
    alert("Trip registered successfully!");
  } catch (err) {
    console.error(" Upload failed:", err.message);
    alert("Error: " + err.message);
  }
};


  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={4} />
        <h1 className="text-2xl font-bold mb-6">Pricing and Inclusions</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Single", "Double", "Triple"].map((type) => (
              <div key={type}>
                <label className="block text-sm font-medium mb-1">{`${type} Room Price`}</label>
                <input
                  type="number"
                  {...register(`price${type}`)}
                  className="w-full rounded-lg px-4 py-3 bg-input text-sm border border-input"
                />
                {errors[`price${type}`] && (
                  <p className="text-red-500 text-xs">
                    {errors[`price${type}`]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Inclusions */}
          <div>
            <label className="block text-sm font-medium mb-2">What's Included</label>
            <textarea
              {...register("inclusionsText")}
              rows={4}
              className="w-full rounded-lg px-4 py-3 bg-input text-sm border border-input"
              placeholder="Hotel, Meals, Tour guide..."
            ></textarea>
            {errors.inclusionsText && (
              <p className="text-red-500 text-xs">{errors.inclusionsText.message}</p>
            )}
          </div>

          {/* Exclusions */}
          <div>
            <label className="block text-sm font-medium mb-2">What's Not Included</label>
            <textarea
              {...register("exclusionsText")}
              rows={4}
              className="w-full rounded-lg px-4 py-3 bg-input text-sm border border-input"
              placeholder="Flights, Visa, Tips..."
            ></textarea>
            {errors.exclusionsText && (
              <p className="text-red-500 text-xs">{errors.exclusionsText.message}</p>
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
