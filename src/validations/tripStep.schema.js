
import { z } from "zod";

// Step 1
export const tripStep1Schema = z
  .object({
    tripTitle: z.string().min(3, "Trip title is required"),
    description: z.string().min(10, "Description is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  })
  .refine(
    (data) => new Date(data.startDate) <= new Date(data.endDate),
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
 
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      return new Date(data.startDate) >= today;
    },
    {
      message:"You cannot choose a date in the past" ,
      path: ["startDate"], 
    }
  );
// Step 2
export const tripStep2Schema = z.object({
  vrVideo: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "VR video is required",
    }),
  photos: z
    .array(
      z.instanceof(File).refine((file) => file.size > 0, {
        message: "Invalid photo file",
      })
    )
    .min(1, "At least one photo is required"),
});

// Step 3
export const tripStep3Schema = z.object({
  locationURL: z.string().url("Invalid URL"),
  ticketCount: z
    .string()
    .min(1, "Ticket count is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Ticket count must be a positive number",
    }),
});
export const tripStep4Schema = z.object({
  priceSingle: z
    .string()
    .min(1, "Single room price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    }),
  priceDouble: z
    .string()
    .min(1, "Double room price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    }),
  priceTriple: z
    .string()
    .min(1, "Triple room price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    }),
  inclusionsText: z
    .string()
    .min(1, "Inclusions field is required"),
  exclusionsText: z
    .string()
    .min(1, "Exclusions field is required"),
});


// export const tripFormSchema = tripStep1Schema
//   .merge(tripStep2Schema)
//   .merge(tripStep3Schema);
