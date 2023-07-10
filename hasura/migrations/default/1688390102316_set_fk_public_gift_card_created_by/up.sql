alter table "public"."gift_card"
  add constraint "gift_card_created_by_fkey"
  foreign key ("created_by")
  references "public"."user"
  ("id") on update restrict on delete restrict;
