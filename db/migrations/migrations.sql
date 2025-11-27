-- ========= 1. CRIAÇÃO DAS TABELAS =========
-- Cria a tabela para os lotes
CREATE TABLE public.lotes (
    lote_id character varying(255) NOT NULL,
    nome_lote character varying(255),
    data_criacao timestamp with time zone DEFAULT now()
);

-- Cria a tabela para as medições dos sensores
CREATE TABLE public.medicoes (
    medicao_id integer NOT NULL,
    sensor_id character varying(255) NOT NULL,
    lote_id character varying(255),
    "timestamp" timestamp with time zone NOT NULL,
    temp_c numeric(5,2),
    umidade_pct numeric(5,2),
    bateria_pct numeric(5,2),
    status character varying(50)
);

-- Cria a tabela para os utilizadores
CREATE TABLE public.users (
    id_user integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


-- ========= 2. CONFIGURAÇÃO DE SEQUÊNCIAS (AUTO-INCREMENTO) =========
-- Configura o auto-incremento para medicoes.medicao_id
CREATE SEQUENCE public.medicoes_medicao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.medicoes_medicao_id_seq OWNED BY public.medicoes.medicao_id;

ALTER TABLE ONLY public.medicoes ALTER COLUMN medicao_id SET DEFAULT nextval('public.medicoes_medicao_id_seq'::regclass);


-- Configura o auto-incremento para users.id_user
CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


-- ========= 3. ADIÇÃO DE CONSTRAINTS (CHAVES) =========
-- Chave Primária (PK) para lotes
ALTER TABLE ONLY public.lotes
    ADD CONSTRAINT lotes_pkey PRIMARY KEY (lote_id);

-- Chave Primária (PK) para medicoes
ALTER TABLE ONLY public.medicoes
    ADD CONSTRAINT medicoes_pkey PRIMARY KEY (medicao_id);

-- Chave Primária (PK) para users
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);

-- Constraint Única (UNIQUE) para o email dos users
ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);

-- Chave Estrangeira (FK) ligando medicoes.lote_id a lotes.lote_id
ALTER TABLE ONLY public.medicoes
    ADD CONSTRAINT medicoes_lote_id_fkey FOREIGN KEY (lote_id) REFERENCES public.lotes(lote_id);
