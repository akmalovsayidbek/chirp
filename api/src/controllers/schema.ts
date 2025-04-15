import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required." })
  .max(30, { message: "Name must be 30 characters or less." })
  .transform((val) =>
    val.replace(/\s+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );

export const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: "Username must be at least 3 characters long." })
  .max(15, { message: "Username must be at most 15 characters long." })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores.",
  })
  .refine((val) => !/^_/.test(val), {
    message: "Username cannot start with an underscore.",
  })
  .refine((val) => !/__/.test(val), {
    message: "Username cannot contain consecutive underscores.",
  });

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long." })
  .max(64, { message: "Password must be at most 64 characters long." });

const userAgentSchema = z.string().optional();

export const stringSchema = z.string().max(255);

export const signupSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  password: passwordSchema,
  userAgent: userAgentSchema,
});

export const loginSchema = z.object({
  username: stringSchema.trim(),
  password: stringSchema,
  userAgent: userAgentSchema,
});
