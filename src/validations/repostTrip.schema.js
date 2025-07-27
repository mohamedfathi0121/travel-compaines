import { z } from "zod";

// Schema for the "Location and Availability" step (Step 5)
export const tripStep5Schema = z
  .object({
    locationURL: z
      .string()
      .url({ message: "Must be a valid URL" })
      .optional()
      .or(z.literal("")),
    ticketCount: z.coerce
      .number({ invalid_type_error: "Must be a number" })
      .int()
      .positive({ message: "Number of tickets must be positive" }),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  })
  .refine(data => new Date(data.startDate) <= new Date(data.endDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
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

// Schema for the "Pricing and Inclusions" step (Step 6)
export const tripStep6Schema = z.object({
    priceSingle: z.coerce
        .number({ required_error: "Single room price is required", invalid_type_error: "Price must be a number" })
        .positive({ message: "Price must be a positive number" }),
    priceDouble: z.coerce
        .number({ required_error: "Double room price is required", invalid_type_error: "Price must be a number" })
        .positive({ message: "Price must be a positive number" }),
    priceTriple: z.coerce
        .number({ required_error: "Triple room price is required", invalid_type_error: "Price must be a number" })
        .positive({ message: "Price must be a positive number" }),
    inclusionsText: z.string().max(1000, { message: "Cannot exceed 1000 characters" }).optional(),
    exclusionsText: z.string().max(1000, { message: "Cannot exceed 1000 characters" }).optional(),
});