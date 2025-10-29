-- Cria um schema para organização
CREATE SCHEMA IF NOT EXISTS empresa;

-- Tabela de estufas
CREATE TABLE IF NOT EXISTS empresa.estufas (
  estufa_id SERIAL PRIMARY KEY,
  nome_estufa VARCHAR(100) NOT NULL,
  localizacao VARCHAR(255),
  data_instalacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de sensores
CREATE TABLE IF NOT EXISTS empresa.sensores (
  sensor_id VARCHAR(255) PRIMARY KEY,
  estufa_id INT REFERENCES empresa.estufas(estufa_id) ON DELETE CASCADE,
  tipo_sensor VARCHAR(50) DEFAULT 'ambiental',
  posicao VARCHAR(50), -- por ex: "norte", "sul", "topo"
  data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de lotes de madeira
CREATE TABLE IF NOT EXISTS empresa.lotes (
  lote_id VARCHAR(255) PRIMARY KEY,
  estufa_id INT REFERENCES empresa.estufas(estufa_id) ON DELETE SET NULL,
  descricao VARCHAR(255),
  data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
  data_fim TIMESTAMP WITH TIME ZONE
);

-- Tabela de leituras de sensores
CREATE TABLE IF NOT EXISTS empresa.leituras (
  leitura_id SERIAL PRIMARY KEY,
  sensor_id VARCHAR(255) REFERENCES empresa.sensores(sensor_id) ON DELETE CASCADE,
  lote_id VARCHAR(255) REFERENCES empresa.lotes(lote_id) ON DELETE SET NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  temperatura_c NUMERIC(5,2),
  umidade_pct NUMERIC(5,2),
  bateria_pct NUMERIC(5,2),
  status VARCHAR(50),
  CONSTRAINT leitura_unica UNIQUE(sensor_id, timestamp)
);

-- Índices para performance de busca por tempo e sensor
CREATE INDEX idx_leituras_sensor_timestamp ON empresa.leituras(sensor_id, timestamp);

