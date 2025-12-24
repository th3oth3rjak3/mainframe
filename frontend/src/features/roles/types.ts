import * as z from "zod";

export const ROLES = {
  Administrator: "Administrator",
  BasicUser: "Basic User",
  RecipeUser: "Recipe User",
} as const;

const RoleNameSchema = z.enum(Object.values(ROLES));

// alias for reuse
export type RoleName = z.infer<typeof RoleNameSchema>;

/**
 * Role schema for validation of roles
 */
export const RoleSchema = z.object({
  id: z.uuidv7(),
  name: RoleNameSchema,
  // Add other role fields as needed
});

export type Role = z.infer<typeof RoleSchema>;
