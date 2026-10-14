CREATE TABLE `verification_audit` (
	`id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL,
	`action` text NOT NULL,
	`created_at` text NOT NULL
);
