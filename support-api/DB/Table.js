const pool = require('../db');

const createTables = async () => {
    try {
        await pool.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
                   `);

        await pool.query(`
     CREATE TYPE user_type AS ENUM ('USER', 'MANAGER', 'SUPER_MANAGER', 'ARTIST');

            `);


        await pool.query(`
            CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    full_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    type user_type NOT NULL DEFAULT 'USER'::user_type,
    created_at timestamp with time zone DEFAULT now(),
    is_agree boolean DEFAULT false,
    is_subscribed boolean DEFAULT false,
    subscription_start date,
    subscription_end date,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
);
     
    `);
        await pool.query(`
    CREATE TABLE IF NOT EXISTS public.ads
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    id_user uuid NOT NULL,
    company character varying(255) COLLATE pg_catalog."default" NOT NULL,
    type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    goal character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    approved boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT ads_pkey PRIMARY KEY (id),
    CONSTRAINT ads_id_user_fkey FOREIGN KEY (id_user)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
    `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS public.user_profiles
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    age integer,
    website character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    occupation character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
    CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
     
    `);



        console.log("✔ כל הטבלאות נוצרו בהצלחה");
    } catch (err) {
        console.error("❌ שגיאה ביצירת הטבלאות:", err);
    } finally {
        pool.end();
    }
};

createTables();