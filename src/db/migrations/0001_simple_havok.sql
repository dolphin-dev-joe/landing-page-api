ALTER TABLE "faqs" ADD COLUMN "question_en" varchar(255);--> statement-breakpoint
ALTER TABLE "faqs" ADD COLUMN "answer_en" text;--> statement-breakpoint
ALTER TABLE "perfumes" ADD COLUMN "popular" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "perfumes" ADD COLUMN "fabric_safe" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "perfumes" ADD COLUMN "long_lasting" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "perfumes" ADD COLUMN "premium" boolean DEFAULT false NOT NULL;