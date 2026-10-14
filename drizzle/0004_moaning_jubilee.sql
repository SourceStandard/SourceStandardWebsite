CREATE TABLE `confidential_sourcing_records` (
	`company_id` text PRIMARY KEY NOT NULL,
	`disclosure` text DEFAULT '' NOT NULL,
	`original_report_references` text DEFAULT '' NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `program_memberships` (
	`company_id` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`activation_date` text DEFAULT '' NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `program_test_events` (
	`id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL,
	`product` text NOT NULL,
	`lot` text NOT NULL,
	`labeled_size` text NOT NULL,
	`test_date` text NOT NULL,
	`laboratory` text NOT NULL,
	`method` text NOT NULL,
	`identity_finding` text NOT NULL,
	`purity_finding` text NOT NULL,
	`outcome` text NOT NULL,
	`public_report_url` text NOT NULL,
	`redaction_notice` text DEFAULT '' NOT NULL,
	`correction` text DEFAULT '' NOT NULL,
	`published` text DEFAULT 'no' NOT NULL
);
