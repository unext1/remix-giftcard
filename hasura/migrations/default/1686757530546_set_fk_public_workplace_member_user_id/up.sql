alter table "public"."workplace_member" drop constraint "workplace_member_user_id_fkey",
  add constraint "workplace_member_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update restrict on delete cascade;
