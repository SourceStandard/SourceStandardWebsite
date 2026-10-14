import { sqliteTable, text, index, integer } from "drizzle-orm/sqlite-core";
export const applications = sqliteTable("applications", {
 id: text("id").primaryKey(), userId: text("user_id").notNull(), program: text("program").notNull(),
 legalName: text("legal_name").notNull(), brandName: text("brand_name").notNull(), website: text("website").notNull(),
 contactName: text("contact_name").notNull(), contactEmail: text("contact_email").notNull(),
 country: text("country").notNull(), documentation: text("documentation").notNull(),
 status: text("status").notNull().default("Received"), createdAt: text("created_at").notNull(),
}, t => [index("applications_user_idx").on(t.userId)]);
export const registry = sqliteTable("registry", {
 id: text("id").primaryKey(), name: text("name").notNull(), program: text("program").notNull(),
 status: text("status").notNull(), website: text("website").notNull(), country: text("country").notNull(),
 scope: text("scope").notNull(), reviewedAt: text("reviewed_at").notNull(),
});

export const directory = sqliteTable("directory", {
 id: text("id").primaryKey(), name: text("name").notNull(), kind: text("kind").notNull(), website: text("website").notNull(), location: text("location").notNull(), category: text("category").notNull(), source: text("source").notNull(), sourceUrl: text("source_url").notNull(), sourceDate: text("source_date").notNull(), status:text("status").notNull().default("Not verified by Source Standard"), profile:text("profile").notNull().default("{}")
}, t => [index("directory_kind_idx").on(t.kind)]);
export const verificationRequests=sqliteTable('verification_requests',{id:text('id').primaryKey(),company:text('company').notNull(),website:text('website').notNull(),type:text('type').notNull(),contact:text('contact').notNull(),email:text('email').notNull(),status:text('status').notNull().default('New'),notes:text('notes').notNull().default(''),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull()});
export const adminSessions=sqliteTable('admin_sessions',{tokenHash:text('token_hash').primaryKey(),expiresAt:text('expires_at').notNull()});
export const intakeLimits=sqliteTable('intake_limits',{key:text('key').primaryKey(),attempts:text('attempts').notNull(),expiresAt:text('expires_at').notNull()});
export const verificationAudit=sqliteTable('verification_audit',{id:text('id').primaryKey(),companyId:text('company_id').notNull(),action:text('action').notNull(),createdAt:text('created_at').notNull()});

// Program participation and analytical evidence are independent of legacy verification.
export const memberships=sqliteTable('program_memberships',{companyId:text('company_id').primaryKey(),status:text('status').notNull(),activationDate:text('activation_date').notNull().default(''),scheduleReview:text('schedule_review').notNull().default('Annual schedule requires administrative review'),updatedAt:text('updated_at').notNull()});
export const testEvents=sqliteTable('program_test_events',{id:text('id').primaryKey(),companyId:text('company_id').notNull(),product:text('product').notNull(),lot:text('lot').notNull(),labeledSize:text('labeled_size').notNull(),testDate:text('test_date').notNull(),laboratory:text('laboratory').notNull(),method:text('method').notNull(),identityFinding:text('identity_finding').notNull(),purityFinding:text('purity_finding').notNull(),outcome:text('outcome').notNull(),publicReportUrl:text('public_report_url').notNull(),redactionNotice:text('redaction_notice').notNull().default(''),correction:text('correction').notNull().default(''),published:text('published').notNull().default('no')});
export const confidentialRecords=sqliteTable('confidential_sourcing_records',{companyId:text('company_id').primaryKey(),disclosure:text('disclosure').notNull().default(''),originalReportReferences:text('original_report_references').notNull().default(''),updatedAt:text('updated_at').notNull()});
export const clinicalRelationships=sqliteTable('clinical_public_relationships',{id:text('id').primaryKey(),clinicId:text('clinic_id').notNull(),facilityId:text('facility_id').notNull(),publicEvidenceUrl:text('public_evidence_url').notNull(),reviewDate:text('review_date').notNull(),authorized:text('authorized').notNull().default('no')});

export const programSettings=sqliteTable('program_settings',{key:text('key').primaryKey(),rate:integer('rate').notNull().default(50),revision:text('revision').notNull().default('initial'),updatedAt:text('updated_at').notNull().default(''),updatedBy:text('updated_by').notNull().default('')});
export const policyAudit=sqliteTable('policy_audit',{id:text('id').primaryKey(),previousRate:integer('previous_rate').notNull(),newRate:integer('new_rate').notNull(),reason:text('reason').notNull(),actor:text('actor').notNull(),createdAt:text('created_at').notNull()});
