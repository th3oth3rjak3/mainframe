import * as z from "zod";

import { UserBaseSchema } from "../users/types";

export const SessionSummarySchema = z.object({
  user: UserBaseSchema,
  activeSessions: z.number().int(),
});

export type SessionSummary = z.infer<typeof SessionSummarySchema>;
