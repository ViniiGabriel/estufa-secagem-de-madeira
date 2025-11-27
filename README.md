# 🌲 Sistema de Monitoramento de Estufa de Secagem de Madeira

Sistema completo de monitoramento e controle para estufas de secagem de madeira, desenvolvido com arquitetura IoT que integra sensores, comunicação MQTT, backend Node.js e interface web React.

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido para monitorar e controlar estufas de secagem de madeira de forma automatizada. O sistema permite:

- Coleta automática de dados de temperatura, umidade e bateria através de sensores IoT
- Visualização em tempo real dos dados coletados através de gráficos interativos
- Gerenciamento de múltiplas estufas e lotes de madeira
- Sistema de autenticação para administradores
- Armazenamento histórico de todas as medições

## ✨ Funcionalidades

### Para Usuários

- 📊 Visualização de dados em tempo real (temperatura, umidade, bateria)
- 📈 Gráficos históricos das medições
- 🔍 Seleção de estufas específicas para monitoramento
- 📋 Tabela comparativa de todas as estufas

### Para Administradores

- 🔐 Sistema de autenticação seguro
- ➕ Cadastro de novas estufas
- 📡 Cadastro e gerenciamento de sensores
- 👥 Cadastro de novos administradores
- 📊 Painel administrativo completo

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento de páginas
- **Chart.js** - Gráficos e visualizações
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP
- **Formik + Yup** - Gerenciamento de formulários e validação

### Backend

- **Node.js** - Runtime JavaScript
- **Express 5** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **MQTT** - Protocolo de comunicação IoT
- **bcrypt** - Criptografia de senhas
- **pg** - Cliente PostgreSQL para Node.js

### IoT/Firmware

- **Arduino/ESP32** - Microcontrolador
- **DHT11** - Sensor de temperatura e umidade
- **WiFi** - Conectividade sem fio
- **PubSubClient** - Cliente MQTT para Arduino

### Infraestrutura

- **Docker Compose** - Orquestração de containers
- **Mosquitto** - Broker MQTT
- **PostgreSQL** - Banco de dados containerizado

## 🏗️ Arquitetura do Sistema

```
┌─────────────┐
│   ESP32     │  Coleta dados dos sensores
│  (Firmware) │  e publica via MQTT
└──────┬──────┘
       │ MQTT
       ▼
┌─────────────┐
│  Mosquitto  │  Broker MQTT
│   (Docker)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Backend   │  Recebe mensagens MQTT
│  (Node.js)  │  e armazena no banco
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ PostgreSQL  │  Armazena dados históricos
│   (Docker)  │
└─────────────┘
       ▲
       │ REST API
       │
┌──────┴──────┐
│   Frontend  │  Interface web React
│   (React)   │  para visualização
└─────────────┘
```

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **Git**
- **Arduino IDE** (para upload do firmware)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/estufa-secagem-de-madeira.git
cd estufa-secagem-de-madeira
```

### 2. Configure o Docker Compose

Inicie os serviços de infraestrutura (PostgreSQL e Mosquitto):

```bash
docker-compose up -d
```

### 3. Configure o Backend

```bash
cd backend
npm install
```

Edite o arquivo `server.js` e `src/mqtt/mqtt_client.js` com as credenciais do seu banco de dados:

```javascript
const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "mydatabase",
  password: "mypassword",
  port: 5432,
});
```

Inicie o servidor backend:

```bash
npm start
```

O servidor estará rodando em `http://localhost:5000`.

### 4. Configure o Frontend

Em um novo terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

### 5. Configure o Firmware

1. Abra o arquivo `firmware/firmware.ino` no Arduino IDE
2. Instale as bibliotecas necessárias:
   - WiFi (incluída no ESP32)
   - PubSubClient
   - DHT sensor library
3. Configure as credenciais WiFi e MQTT:

```cpp
const char* ssid = "SUA_REDE_WIFI";
const char* password = "SENHA_DA_REDE";
const char* mqtt_server = "IP_DO_SERVIDOR_MQTT";
const char* ID_DO_LOTE = "LOTE_001";
const char* ID_DO_SENSOR = "SENSOR_001";
```

4. Faça o upload do código para o ESP32

## ⚙️ Configuração

### Banco de Dados

O banco de dados é inicializado automaticamente pelo Docker Compose usando o script de migração em `db/migrations/migrations.sql`.

As tabelas criadas são:

- `empresa.estufas` - Cadastro de estufas
- `empresa.sensores` - Cadastro de sensores
- `empresa.lotes` - Lotes de madeira
- `empresa.leituras` - Histórico de medições

### MQTT

O broker Mosquitto está configurado no arquivo `mosquitto/config/mosquitto.conf`. O padrão de tópicos utilizado é:

```
Estufa/{lote_id}/sensor/{sensor_id}
```

Exemplo: `Estufa/LOTE_001/sensor/SENSOR_001`

### Formato de Mensagem MQTT

O firmware publica mensagens no formato JSON:

```json
{
  "lote_id": "LOTE_001",
  "temp_c": 25.5,
  "umidade_pct": 60.0,
  "bateria_pct": 85.0,
  "status": "OK"
}
```

## 📖 Uso

### Acessando o Sistema

1. Abra o navegador e acesse `http://localhost:5173`
2. Para acessar o painel administrativo, clique em "Login" e faça login com suas credenciais
3. Se não tiver uma conta, um administrador precisa criar uma conta para você

### Visualizando Dados

- Na página principal, você verá todas as estufas cadastradas
- Use o dropdown no topo para selecionar uma estufa específica
- Os dados em tempo real são exibidos em cards (Temperatura, Umidade, Bateria)
- Os gráficos mostram o histórico das medições

### Gerenciamento Administrativo

Após fazer login, você terá acesso ao painel administrativo onde pode:

- **Cadastrar Nova Estufa**: Adicione novas estufas ao sistema
- **Cadastrar Sensor**: Associe sensores às estufas
- **Ver Sensores**: Liste todos os sensores cadastrados
- **Cadastrar Admin**: Crie novas contas de administrador

## 📁 Estrutura do Projeto

```
estufa-secagem-de-madeira/
│
├── backend/                 # Servidor Node.js
│   ├── src/
│   │   ├── api/            # Rotas da API REST
│   │   ├── loginApi/       # Autenticação
│   │   ├── registerApi/    # Registro de usuários
│   │   ├── sensoresApi/    # Gerenciamento de sensores
│   │   └── mqtt/           # Cliente MQTT
│   ├── server.js           # Servidor principal
│   └── package.json
│
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── data/           # Funções de fetch de dados
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Entry point
│   └── package.json
│
├── firmware/               # Código Arduino/ESP32
│   └── firmware.ino        # Código do microcontrolador
│
├── db/                     # Scripts de banco de dados
│   └── migrations/
│       └── migrations.sql  # Schema do banco
│
├── mosquitto/              # Configuração do broker MQTT
│   ├── config/
│   │   └── mosquitto.conf
│   └── data/
│
└── docker-compose.yml      # Orquestração de containers
```

## 🔌 API Endpoints

### Autenticação

- `POST /login` - Autenticação de usuário
- `POST /register` - Registro de novo administrador

### API Principal

- `GET /api/lotes` - Lista todos os lotes
- `POST /api/lotes` - Cria um novo lote
- `GET /api/leituras` - Obtém últimas 100 leituras

### Sensores

- `GET /api/sensores` - Lista todos os sensores
- `POST /api/sensores` - Cadastra um novo sensor

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt
- Rotas administrativas protegidas com autenticação
- Validação de dados no frontend e backend
- CORS configurado para segurança
