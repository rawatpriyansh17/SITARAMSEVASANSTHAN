CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`receipt` text NOT NULL,
	`razorpay_order_id` text NOT NULL,
	`razorpay_payment_id` text,
	`razorpay_signature` text,
	`amount` integer NOT NULL,
	`currency` text DEFAULT 'INR' NOT NULL,
	`donor_name` text,
	`donor_email` text,
	`donor_phone` text,
	`message` text,
	`status` text DEFAULT 'created' NOT NULL,
	`failure_reason` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`verified_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payments_receipt_idx` ON `payments` (`receipt`);--> statement-breakpoint
CREATE UNIQUE INDEX `payments_razorpay_order_id_idx` ON `payments` (`razorpay_order_id`);--> statement-breakpoint
CREATE INDEX `payments_razorpay_payment_id_idx` ON `payments` (`razorpay_payment_id`);--> statement-breakpoint
CREATE INDEX `payments_status_idx` ON `payments` (`status`);