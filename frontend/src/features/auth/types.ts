import * as z from "zod";
import { ROLES, RoleSchema, type Role, type RoleName } from "../roles/types";
import { PasswordSchema } from "../users/types";
import { DateTimeSchema, NullableDateTimeSchema } from "@/validation/date_time";

/**
 * User schema for validation at the API boundary matching the backend UserRead struct.
 * Timestamps are transformed from ISO strings to Date objects.
 */
export const UserSchema = z.object({
  id: z.uuidv7(),
  username: z.string().min(1).max(50),
  email: z.email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  lastLogin: NullableDateTimeSchema,
  failedLoginAttempts: z.number().int(),
  lastFailedLoginAttempt: NullableDateTimeSchema,
  isDisabled: z.boolean(),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
  roles: RoleSchema.array(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Login response schema matching the backend LoginResponse struct.
 * Note: This is a simpler representation returned on login.
 */
export const LoginResponseSchema = z.object({
  username: z.string().min(1).max(50),
  email: z.email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  lastLogin: NullableDateTimeSchema,
  roles: RoleSchema.array(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

/**
 * AuthenticatedUser is the details of a user who has been successfully
 * logged into the application. The only way to create one is by getting
 * a successful login response and passing that in the constructor.
 */
export class AuthenticatedUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  lastLogin: Date | null;
  roles: Role[];

  constructor(loginResponse: LoginResponse) {
    this.username = loginResponse.username;
    this.email = loginResponse.email;
    this.firstName = loginResponse.firstName;
    this.lastName = loginResponse.lastName;
    this.lastLogin = loginResponse.lastLogin;
    this.roles = loginResponse.roles;
  }

  hasRole(name: RoleName): boolean {
    return this.roles.map((r) => r.name).includes(name);
  }

  get isAdmin(): boolean {
    return this.hasRole(ROLES.Administrator);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export const LoginRequestSchema = z.object({
  username: z.string().min(3).max(50),
  password: PasswordSchema,
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
