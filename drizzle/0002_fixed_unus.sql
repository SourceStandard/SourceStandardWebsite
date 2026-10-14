CREATE TABLE `admin_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `intake_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`attempts` text NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`company` text NOT NULL,
	`website` text NOT NULL,
	`type` text NOT NULL,
	`contact` text NOT NULL,
	`email` text NOT NULL,
	`status` text DEFAULT 'New' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
