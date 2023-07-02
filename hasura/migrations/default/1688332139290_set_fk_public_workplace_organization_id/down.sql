alter table "public"."workplace" drop constraint "workplace_organization_id_fkey",
  add constraint "workplace_organization_id_fkey"
  foreign key ("organization_id")
  references "public"."organization"
  ("id") on update restrict on delete restrict;
