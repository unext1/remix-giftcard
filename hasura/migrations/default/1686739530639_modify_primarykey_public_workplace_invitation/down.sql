alter table "public"."workplace_invitation" drop constraint "workplace_invitation_pkey";
alter table "public"."workplace_invitation"
    add constraint "workplace_invitation_pkey"
    primary key ("workplace_id", "email", "id");
