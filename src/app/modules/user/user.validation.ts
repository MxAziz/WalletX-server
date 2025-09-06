import z from "zod";
import { Role } from "./user.interface";


export const createUserZodSchema = z.object({
  fullname: z
    .string({ error: "Fullname must be string" })
    .min(2, { message: "Fullname must be at least 2 characters long" }),
  phone: z
    .string({ error: "Phone number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh.",
    }),
  password: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
  role: z.enum(Object.values(Role) as [string]).optional(),

})


export const updateUserZodSchema = z.object({
  fullname: z
    .string({ error: "Fullname must be string" })
    .min(2, { message: "Fullname at least 2 character long" })
    .optional(),
  phone: z
    .string({ error: "Phone number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
});

export const changePasswordZodSchema = z.object({
  currentPassword: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 character." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),

  newPassword: z
    .string({ error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 character." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
});