
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
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  inclusions: z.array(z.string().min(1)).min(1, "At least one inclusion is required"),
  exclusions: z.array(z.string().min(1)).min(1, "At least one exclusion is required"),
});

// export const tripFormSchema = tripStep1Schema
//   .merge(tripStep2Schema)
//   .merge(tripStep3Schema);
