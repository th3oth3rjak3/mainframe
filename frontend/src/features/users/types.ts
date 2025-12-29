import * as z from "zod";
import {
  isUpper,
  isLower,
  isSpecial,
  isAsciiPrintable,
  isDigit,
  count,
} from "@/features/users/validators/password_validators";
import { NullableDateTimeSchema } from "@/validation/date_time";
import { ALLOWED_SPECIALS } from "../auth/password_utilities";

export const UserBaseSchema = z.object({
  id: z.uuidv7(),
  username: z.string().min(3).max(50),
  email: z.email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  isDisabled: z.boolean(),
  lastLogin: NullableDateTimeSchema,
});

export type UserBase = z.infer<typeof UserBaseSchema>;

export const PasswordSchema = z
  .string()
  .refine((password) => [...password].every(isAsciiPrintable), {
    error: "only ASCII printable characters (33-126)",
  })
  .refine((password) => count(password, isUpper) >= 2, {
    error: "password must contain at least two uppercase letters",
  })
  .refine((password) => count(password, isLower) >= 2, {
    error: "password must contain at least two lowercase letters",
  })
  .refine((password) => count(password, isDigit) >= 2, {
    error: "password must contain at least 2 digits",
  })
  .refine((password) => count(password, isSpecial) >= 2, {
    error: `password must contain at least 2 special characters from: ${ALLOWED_SPECIALS}`,
  });

export const CreateUserRequestSchema = z
  .object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.email(),
    username: z.string().min(1).max(50),
    rawPassword: PasswordSchema,
    confirmPassword: PasswordSchema,
    passwordExpiration: z.date(),
    roles: z.array(z.uuidv7()),
  })
  .refine((data) => data.rawPassword === data.confirmPassword, {
    error: "passwords must match",
    path: ["confirmPassword"],
  });

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
