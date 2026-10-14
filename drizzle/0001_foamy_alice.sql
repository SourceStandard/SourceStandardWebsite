CREATE TABLE `directory` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`website` text NOT NULL,
	`location` text NOT NULL,
	`category` text NOT NULL,
	`source` text NOT NULL,
	`source_url` text NOT NULL,
	`source_date` text NOT NULL,
	`status` text DEFAULT 'Not verified by Source Standard' NOT NULL,
	`profile` text DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `directory_kind_idx` ON `directory` (`kind`);