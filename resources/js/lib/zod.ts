import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const CourseFormSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    price: z
        .string()
        .regex(/^\d+$/, "Price must be a valid number")
        .transform((val) => parseInt(val, 10))
        .refine((val) => val >= 0, "Price must be a non-negative number"),
    is_active: z.boolean(),
    thumbnail: z
        .any()
        .refine((files) => files?.length === 1, "Image is required.")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            "Max file size is 5MB."
        )
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png, and .webp files are accepted."
        ),
});
