alter table "public"."workplace"
  add constraint "workplace_owner_id_fkey"
  foreign key ("owner_id")
  references "public"."user"
  ("id") on update restrict on delete cascade;
