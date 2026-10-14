CREATE TABLE `policy_audit` (
	`id` text PRIMARY KEY NOT NULL,
	`previous_rate` integer NOT NULL,
	`new_rate` integer NOT NULL,
	`reason` text NOT NULL,
	`actor` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `program_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`rate` integer DEFAULT 50 NOT NULL,
	`revision` text DEFAULT 'initial' NOT NULL,
	`updated_at` text DEFAULT '' NOT NULL,
	`updated_by` text DEFAULT '' NOT NULL
);
