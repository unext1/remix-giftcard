CREATE TABLE "public"."gift_card" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "workplace_id" uuid NOT NULL, "amount" integer NOT NULL, "stripe_payment_id" text, "is_active" boolean NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("workplace_id") REFERENCES "public"."workplace"("id") ON UPDATE restrict ON DELETE restrict);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_gift_card_updated_at"
BEFORE UPDATE ON "public"."gift_card"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_gift_card_updated_at" ON "public"."gift_card"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
