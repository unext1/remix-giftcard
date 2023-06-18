BEGIN TRANSACTION;
ALTER TABLE "public"."workplace_invitation" DROP CONSTRAINT "workplace_invitation_pkey";

ALTER TABLE "public"."workplace_invitation"
    ADD CONSTRAINT "workplace_invitation_pkey" PRIMARY KEY ("workplace_id", "email");
COMMIT TRANSACTION;
