CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`program` text NOT NULL,
	`legal_name` text NOT NULL,
	`brand_name` text NOT NULL,
	`website` text NOT NULL,
	`contact_name` text NOT NULL,
	`contact_email` text NOT NULL,
	`country` text NOT NULL,
	`documentation` text NOT NULL,
	`status` text DEFAULT 'Received' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `applications_user_idx` ON `applications` (`user_id`);--> statement-breakpoint
CREATE TABLE `registry` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`program` text NOT NULL,
	`status` text NOT NULL,
	`website` text NOT NULL,
	`country` text NOT NULL,
	`scope` text NOT NULL,
	`reviewed_at` text NOT NULL
);
