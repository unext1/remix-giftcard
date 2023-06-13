alter table "public"."workplace_member" drop constraint "workplace_member_workplace_id_fkey",
  add constraint "workplace_member_workplace_id_fkey"
  foreign key ("workplace_id")
  references "public"."workplace"
  ("id") on update restrict on delete cascade;
