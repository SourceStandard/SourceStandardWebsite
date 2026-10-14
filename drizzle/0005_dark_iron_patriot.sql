CREATE TABLE `clinical_public_relationships` (
	`id` text PRIMARY KEY NOT NULL,
	`clinic_id` text NOT NULL,
	`facility_id` text NOT NULL,
	`public_evidence_url` text NOT NULL,
	`review_date` text NOT NULL,
	`authorized` text DEFAULT 'no' NOT NULL
);
