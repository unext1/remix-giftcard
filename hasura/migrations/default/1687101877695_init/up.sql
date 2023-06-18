SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.address (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    line1 text NOT NULL,
    line2 text,
    city text NOT NULL,
    state text,
    postal_code text NOT NULL,
    country text NOT NULL
);
CREATE TABLE public.organization (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    address_id uuid NOT NULL,
    owner_id uuid NOT NULL,
    stripe_subscription_id text,
    stripe_subscription_status text,
    stripe_account_id text,
    stripe_customer_id text
);
CREATE TABLE public."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    image_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.workplace (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title text NOT NULL,
    owner_id uuid NOT NULL,
    organization_id uuid NOT NULL
);
CREATE TABLE public.workplace_invitation (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    workplace_id uuid NOT NULL,
    email text NOT NULL
);
CREATE TABLE public.workplace_member (
    user_id uuid NOT NULL,
    workplace_id uuid NOT NULL
);
ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.workplace_invitation
    ADD CONSTRAINT workplace_invitation_email_workplace_id_key UNIQUE (email, workplace_id);
ALTER TABLE ONLY public.workplace_invitation
    ADD CONSTRAINT workplace_invitation_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.workplace_member
    ADD CONSTRAINT workplace_member_pkey PRIMARY KEY (user_id, workplace_id);
ALTER TABLE ONLY public.workplace
    ADD CONSTRAINT workplace_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_address_updated_at BEFORE UPDATE ON public.address FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_address_updated_at ON public.address IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_organization_updated_at BEFORE UPDATE ON public.organization FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_organization_updated_at ON public.organization IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_user_updated_at BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_user_updated_at ON public."user" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_workplace_invitation_updated_at BEFORE UPDATE ON public.workplace_invitation FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_workplace_invitation_updated_at ON public.workplace_invitation IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_workplace_updated_at BEFORE UPDATE ON public.workplace FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_workplace_updated_at ON public.workplace IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.workplace_invitation
    ADD CONSTRAINT workplace_invitation_workplace_id_fkey FOREIGN KEY (workplace_id) REFERENCES public.workplace(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.workplace_member
    ADD CONSTRAINT workplace_member_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.workplace_member
    ADD CONSTRAINT workplace_member_workplace_id_fkey FOREIGN KEY (workplace_id) REFERENCES public.workplace(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.workplace
    ADD CONSTRAINT workplace_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.workplace
    ADD CONSTRAINT workplace_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;
