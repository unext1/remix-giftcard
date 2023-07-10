alter table "public"."gift_card" drop constraint "gift_card_workplace_id_fkey",
  add constraint "gift_card_workplace_id_fkey"
  foreign key ("workplace_id")
  references "public"."workplace"
  ("id") on update restrict on delete cascade;
