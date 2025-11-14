# Sistema de Monitoramento de Estufa de Secagem de Madeira

Este repositório contém o código-fonte do Sistema de Monitoramento de Estufa de Secagem de Madeira, um projeto de IoT e software para coletar, armazenar e visualizar dados de processos de secagem.

## Objetivo do Projeto

O objetivo principal é implementar um sistema completo para o monitoramento sem fio de Temperatura, Umidade dentro de uma estufa de secagem de madeira
Os dados são coletados em tempo real e associados a lotes de secagem específicos. Um painel web permite a visualização e análise desses dados , fornecendo uma base para a otimização do processo e futuras análises preditivas.

-----

## Arquitetura e Funcionamento

O sistema é composto por três pilares principais (Hardware, Backend e Frontend) que se comunicam para fornecer o monitoramento em tempo real. O fluxo de dados é o seguinte:

1.  **Coleta (Hardware):**

      * Um microcontrolador **ESP32**, alimentado por bateria e posicionado dentro da estufa, realiza a leitura dos sensores (Temperatura, Umidade)
      * Para garantir a autonomia, o firmware do ESP32 utiliza o modo *Deep Sleep* para economizar energia entre as leituras.

2.  **Comunicação (MQTT):**

      * Após cada leitura, o ESP32 se conecta à rede Wi-Fi e publica os dados em um tópico MQTT específico.

3.  **Persistência (Backend):**

      * Uma aplicação **Python (FastAPI)**  atua como um "assinante" (subscriber) do tópico MQTT.
      * Ao receber uma mensagem, o backend valida os dados e os armazena no banco de dados **PostgreSQL**.
      * Crucialmente, o backend associa cada leitura recebida a um "lote de secagem" ativo, permitindo a separação dos dados.

4.  **Visualização (Frontend):**

      * Uma interface web desenvolvida em **React** consome os *endpoints* da API do backend.
      * O usuário pode selecionar um lote de secagem específico e filtrar os dados por um intervalo de tempo (data/hora de início e fim).
      * Os dados de Temperatura e Umidade são então plotados em gráficos interativos (usando Chart.js) para análise visual.

-----

## Funcionalidades Principais (MVP)

  * **Coleta de Dados:** Medição de Temperatura, Umidade.
  * **Comunicação:** Transmissão de dados via MQTT.
  * **Persistência:** Armazenamento dos dados em PostgreSQL[.
  * **Separação por Lote:** Associação de todas as leituras a um identificador de lote de secagem.
  * **Consulta e Filtragem:** A API permite buscar dados por ID de lote e filtrar por período de tempo.
  * **Visualização:** Gráficos de linha (T/H) em função do tempo no frontend.
  * **Exportação:** O frontend permite exportar os dados filtrados para CSV.

-----

## Tecnologias Utilizadas

| Categoria | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Hardware (IoT)** | ESP32 | Microcontrolador com Wi-Fi e baixo consumo. |
| | BME280 / SHT3x | Sensor de Temperatura e Umidade. |
| | Bateria Li-ion | Alimentação do dispositivo. |
| **Comunicação** | MQTT (Mosquitto) | Protocolo leve para troca de mensagens IoT. |
| **Backend** | Python (FastAPI) | API REST e Cliente MQTT (Subscriber). |
| **Banco de Dados** | PostgreSQL | Armazenamento robusto dos dados temporais. |
| **Frontend** | React | Biblioteca para interface do usuário. |
| | Chart.js | Plotagem dos gráficos de dados. |
| | Axios / Fetch | Requisições HTTP para a API. |
| **Ambiente** | Docker & Docker Compose | Contêinerização e orquestração de todos os serviços. |

-----

## Como Executar o Projeto

Toda a infraestrutura da aplicação (Backend, Frontend, Banco de Dados e Broker MQTT) é gerenciada e executada via **Docker Compose**.

### Pré-requisitos

  * Docker (Engine)
  * Docker Compose
  * Firmware gravado no ESP32 (configurado com o Wi-Fi e o endereço do Broker MQTT).

### Execução

1.  Clone este repositório:

    ```bash
    git clone https://github.com/ViniiGabriel/estufa-secagem-de-madeira/
    cd estufa-secagem-de-madeira
    ```

2.  (Se aplicável) Crie os arquivos de configuração necessários, como o `mosquitto.conf` ou um `.env` para o backend, caso não estejam no repositório.

3.  Suba todos os serviços usando o Docker Compose:

    ```bash
    docker-compose up -d --build
    ```

4.  Após a conclusão, os serviços estarão disponíveis:

      * **Frontend:** `http://localhost:5173`
      * **Broker MQTT:** `localhost:1883`
      * **Banco de Dados:** `localhost:5432`

-----

## Escopo Futuro e Melhorias

Este projeto tem uma base sólida para expansões futuras:

  * **Análise Comparativa:** Implementar no frontend a capacidade de sobrepor gráficos de lotes de secagem diferentes (ex: comparar Lote A vs. Lote B).
  * **Sensor Externo:** Adicionar um segundo dispositivo para monitorar as condições ambientais *fora* da estufa, permitindo comparações.
  * **Controle em Malha Fechada:** Expandir o sistema para controlar atuadores (caldeira, ventiladores), enviando comandos (via MQTT) com base nas leituras dos sensores e regras de negócio.
  * **Machine Learning (ML):** Utilizar os dados históricos para treinar modelos de ML capazes de prever o tempo ideal de secagem, otimizar o uso de energia e prever a qualidade da madeira.
