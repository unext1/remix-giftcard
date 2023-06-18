alter table "public"."workplace_invitation" add constraint "workplace_invitation_email_workplace_id_key" unique ("email", "workplace_id");
