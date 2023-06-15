--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-06-11 01:09:33 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 219 (class 1255 OID 24721)
-- Name: check_email(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_email() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
      SELECT 1
      FROM public.users
      WHERE email = NEW.email
  ) THEN
      RAISE EXCEPTION 'Cannot add a duplicate record.';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_email() OWNER TO postgres;

--
-- TOC entry 218 (class 1255 OID 24719)
-- Name: check_schedule(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_schedule() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
      SELECT 1
      FROM public.schedule
      WHERE date = NEW.date
        AND start_at <= NEW.end_at
        AND end_at >= NEW.start_at
        AND user_id = NEW.user_id
  ) THEN
      RAISE EXCEPTION 'Cannot add a duplicate record.';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_schedule() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 24708)
-- Name: schedule; Type: TABLE; Schema: public; Owner: MrCoffee
--

CREATE TABLE public.schedule (
    schedule_id integer NOT NULL,
    date date NOT NULL,
    start_at time without time zone NOT NULL,
    end_at time without time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.schedule OWNER TO "MrCoffee";

--
-- TOC entry 216 (class 1259 OID 24707)
-- Name: schedule_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: MrCoffee
--

CREATE SEQUENCE public.schedule_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedule_schedule_id_seq OWNER TO "MrCoffee";

--
-- TOC entry 3606 (class 0 OID 0)
-- Dependencies: 216
-- Name: schedule_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: MrCoffee
--

ALTER SEQUENCE public.schedule_schedule_id_seq OWNED BY public.schedule.schedule_id;


--
-- TOC entry 215 (class 1259 OID 24701)
-- Name: users; Type: TABLE; Schema: public; Owner: MrCoffee
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(100) NOT NULL,
    firstname character varying(100),
    lastname character varying(100),
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO "MrCoffee";

--
-- TOC entry 214 (class 1259 OID 24700)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: MrCoffee
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO "MrCoffee";

--
-- TOC entry 3607 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: MrCoffee
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3447 (class 2604 OID 24711)
-- Name: schedule schedule_id; Type: DEFAULT; Schema: public; Owner: MrCoffee
--

ALTER TABLE ONLY public.schedule ALTER COLUMN schedule_id SET DEFAULT nextval('public.schedule_schedule_id_seq'::regclass);


--
-- TOC entry 3446 (class 2604 OID 24704)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: MrCoffee
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3600 (class 0 OID 24708)
-- Dependencies: 217
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: MrCoffee
--

COPY public.schedule (schedule_id, date, start_at, end_at, user_id) FROM stdin;
69	2023-07-09	16:10:00	17:10:00	8
70	2023-07-09	12:00:00	13:00:00	8
81	2024-03-12	12:00:00	14:00:00	1
82	20023-07-09	15:00:00	19:00:00	1
84	2024-07-02	12:00:00	14:00:00	57
85	2024-09-17	12:30:00	19:30:00	3
86	2027-12-12	01:00:00	03:00:00	57
\.


--
-- TOC entry 3598 (class 0 OID 24701)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: MrCoffee
--

COPY public.users (user_id, email, firstname, lastname, password) FROM stdin;
8	jack@sparrow.com	Jack	Sparrow	d7739baa47c775943230d8c032f7146f762cd340d653836105c65e34021caa5a
3	donald@duck.com	Donald	Duck	cc0b8910bf2e445c24f263926cf316d4014a277113d3394e1d52e45cbc05e0e3
57	bugs@bunny.eu	Bugs	Bunny	30ae1cde3137158715daafd660cc193a7c0b3c699ce76131a99b44adfd89abcb
1	johnny@bravo.pl	Johnny	Bravo	b45229daab1012568ec741747bcf578d1f41247510cdca71bc9310799a0c10c8
\.


--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 216
-- Name: schedule_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: MrCoffee
--

SELECT pg_catalog.setval('public.schedule_schedule_id_seq', 86, true);


--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: MrCoffee
--

SELECT pg_catalog.setval('public.users_user_id_seq', 64, true);


--
-- TOC entry 3451 (class 2606 OID 24713)
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: MrCoffee
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (schedule_id);


--
-- TOC entry 3449 (class 2606 OID 24706)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: MrCoffee
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3453 (class 2620 OID 24722)
-- Name: users unique_email; Type: TRIGGER; Schema: public; Owner: MrCoffee
--

CREATE TRIGGER unique_email BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.check_email();


--
-- TOC entry 3454 (class 2620 OID 24720)
-- Name: schedule unique_schedule; Type: TRIGGER; Schema: public; Owner: MrCoffee
--

CREATE TRIGGER unique_schedule BEFORE INSERT OR UPDATE ON public.schedule FOR EACH ROW EXECUTE FUNCTION public.check_schedule();


--
-- TOC entry 3452 (class 2606 OID 24714)
-- Name: schedule schedule_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: MrCoffee
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2023-06-11 01:09:34 CEST

--
-- PostgreSQL database dump complete
--

