alter table "public"."organization"
  add constraint "organization_stripe_subscription_status_fkey"
  foreign key ("stripe_subscription_status")
  references "public"."subscription_status"
  ("status") on update restrict on delete restrict;
