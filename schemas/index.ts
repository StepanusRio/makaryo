import { z } from "zod";

export const TicketScemas = z.object({
  informer: z.string(), // Ngisi dewe
  issue: z.string(), // Ngisi dewe
  category: z.string(), // Drowdown
});

export const UpdateTicketScemas = z.object({
  ticket_id: z.string().optional(),
  worker: z.string({ message: "Petugas wajib di isi" }),
  summary: z.string({ message: "Summary wajib di isi" }).optional(),
  issue_type: z.string().optional(),
});

export const UpdateTicketNote = z.object({
  notes: z.string(),
});

export const DelegasiSchemas = z.object({
  category: z.string(),
});
