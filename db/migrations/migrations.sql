-- Cria o schema "empresa" 
CREATE SCHEMA IF NOT EXISTS empresa;

-- Cria a tabela "lotes" dentro do schema "empresa"
CREATE TABLE IF NOT EXISTS empresa.lotes (
  lote_id VARCHAR(255) PRIMARY KEY,
  nome_lote VARCHAR(255),
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cria a tabela "medicoes" dentro do schema "empresa"
CREATE TABLE IF NOT EXISTS empresa.medicoes (
  medicao_id SERIAL PRIMARY KEY,
  sensor_id VARCHAR(255) NOT NULL,
  lote_id VARCHAR(255) REFERENCES empresa.lotes(lote_id),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  temp_c NUMERIC(5, 2),
  umidade_pct NUMERIC(5, 2),
  bateria_pct NUMERIC(5, 2),
  status VARCHAR(50)
);

