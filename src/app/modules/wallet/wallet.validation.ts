import z from "zod";

export const sendWithdrawAndCashInZodSchema = z.object({
  receiver: z.string({ error: "Receiver Id must be string" }),
  amount: z
    .number({ error: "Amount must be number" })
    .min(1, { message: "Send money amount must be positive number" }),
});

export const addMoneyAndCashOutZodSchema = z.object({
  sender: z.string({ error: "Sender Id must be string" }),
  amount: z
    .number({ error: "Amount must be number" })
    .min(1, { message: "Cash out money amount must be positive number" }),
});