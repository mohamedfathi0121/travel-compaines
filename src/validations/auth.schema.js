import { z } from "zod";

// --- Login Schema ---
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
});

// --- Personal Registration Schemas ---
export const personalStep1Schema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("A valid email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// --- Company Registration Schemas ---
export const companyStep1Schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyAddress: z.string().min(1, "Company address is required"),
  companyUrl: z
    .string()
    .url("Must be a valid URL")
    .min(1, "Company URL is required"),
  companyLogo: z
    .any()
    .refine(
      files => files instanceof FileList && files.length > 0,
      "Profile photo is required"
    )
    .refine(
      files =>
        files instanceof FileList &&
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          files[0]?.type
        ),
      "Only JPG, PNG, or WEBP images are allowed"
    ),
});

export const companyStep2Schema = z
  .object({
    email: z.string().email("A valid email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const companyStep3Schema = z.object({
  countryCode: z.string().min(1, "Please select a country code."),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 digits.")
    .regex(/^\d+$/, "Phone number must only contain digits."),
  linkedin1: z
    .string()
    .url("Must be a valid LinkedIn profile URL")
    .optional()
    .or(z.literal("")),
  linkedin2: z
    .string()
    .url("Must be a valid LinkedIn profile URL")
    .optional()
    .or(z.literal("")),
  facebook: z
    .string()
    .url("Must be a valid Facebook profile URL")
    .optional()
    .or(z.literal("")),
});

export const companyStep4Schema = z.object({
  documents: z
    .any()
    .refine(
      (files) => files && files.length === 1,
      "You must upload exactly one document."
    )
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "Only PDF files are allowed."
    ),
});