import { ISSUE_TYPE } from "@/types";
import { z } from "zod";

export const TicketScemas = z.object({
  informer: z.string(), // Ngisi dewe
  issue: z.string(), // Ngisi dewe
  category: z.string(), // Drowdown
});

export const UpdateTicketScemas = z.object({
  ticket_id: z.string(),
  worker: z.string(),
  summary: z.string(),
  issue_type: z.enum(ISSUE_TYPE as [string, ...string[]]),
});

export const UpdateTicketNote = z.object({
  notes: z.string(),
});

export const DelegasiSchemas = z.object({
  category: z.string(),
});
