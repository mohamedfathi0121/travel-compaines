import { z } from 'zod';

// --- Login Schema ---
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});


// --- Personal Registration Schemas ---
export const personalStep1Schema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('A valid email is required'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const personalStep2Schema = z.object({
    age: z.number({ invalid_type_error: "Age is required" }).min(18, 'You must be at least 18 years old'),
    gender: z.string().min(1, 'Gender is required'),
    dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date of birth must be in MM/DD/YYYY format'),
    country: z.string().min(1, 'Country is required'),
    city: z.string().min(1, 'City is required'),
});

export const personalStep3Schema = z.object({
    profilePhoto: z.any().optional(),
});


// --- Company Registration Schemas ---
export const companyStep1Schema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    companyAddress: z.string().min(1, 'Company address is required'),
    companyUrl: z.string().url('Must be a valid URL').min(1, 'Company URL is required'),
    companyLogo: z.any().optional(),
});

export const companyStep2Schema = z.object({
    email: z.string().email('A valid email is required'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const companyStep3Schema = z.object({
    countryCode: z.string().min(1, "Please select a country code."),
    phoneNumber: z.string().min(7, "Phone number must be at least 7 digits.").regex(/^\d+$/, "Phone number must only contain digits."),
    linkedin1: z.string().url('Must be a valid LinkedIn profile URL').optional().or(z.literal('')),
    linkedin2: z.string().url('Must be a valid LinkedIn profile URL').optional().or(z.literal('')),
    facebook: z.string().url('Must be a valid Facebook profile URL').optional().or(z.literal('')),
});

export const companyStep4Schema = z.object({
    documents: z.any().refine(files => files?.length > 0, 'At least one document is required.'),
});
