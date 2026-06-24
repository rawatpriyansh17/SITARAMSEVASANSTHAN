import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const payments = sqliteTable(
  "payments",
  {
    id: text("id").primaryKey(),
    receipt: text("receipt").notNull(),
    razorpayOrderId: text("razorpay_order_id").notNull(),
    razorpayPaymentId: text("razorpay_payment_id"),
    razorpaySignature: text("razorpay_signature"),
    amount: integer("amount").notNull(),
    currency: text("currency").notNull().default("INR"),
    donorName: text("donor_name"),
    donorEmail: text("donor_email"),
    donorPhone: text("donor_phone"),
    message: text("message"),
    status: text("status").notNull().default("created"),
    failureReason: text("failure_reason"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    verifiedAt: text("verified_at"),
  },
  (table) => [
    uniqueIndex("payments_receipt_idx").on(table.receipt),
    uniqueIndex("payments_razorpay_order_id_idx").on(table.razorpayOrderId),
    index("payments_razorpay_payment_id_idx").on(table.razorpayPaymentId),
    index("payments_status_idx").on(table.status),
  ]
);

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
