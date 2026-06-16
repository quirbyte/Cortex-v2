import z from "zod";

export const signupObject = z.object({
  name: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(6),
});

export const orgObject = z.object({
  name: z.string().min(6),
  slug: z.string(),
});

export const eventObject = z.object({
  name: z.string().min(3, "Title must be at least 3 characters"),
  desc: z.string().optional(),
  venue: z.string().min(1, "Venue is required"),
  startsAt: z.string().datetime(),
  price: z.number().min(0),
  capacity: z.number().int().positive(),
  orgId: z.string(),
  tags: z.array(z.string()),
  imageFile: z
    .instanceof(File)
    .nullish()
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Max file size is 2MB",
    })
    .refine((file) => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
      message: "Only .jpg, .png, and .webp formats are supported",
    }),
});