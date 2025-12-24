import { create } from "zustand";
import { httpClient } from "@/lib/http_client";
import * as z from "zod";
import { SessionSummarySchema, type SessionSummary } from "../types";

type SessionStore = {
  getSessionSummaries: () => Promise<SessionSummary[]>;
};

export const useSessionStore = create<SessionStore>(() => ({
  getSessionSummaries: async () => {
    const response = await httpClient.get("sessions").json();
    return z.parse(z.array(SessionSummarySchema), response);
  },
}));
