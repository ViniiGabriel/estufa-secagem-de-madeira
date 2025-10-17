#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h" // Biblioteca para o sensor DHT11

// --- 1. CONFIGURAÇÕES DE REDE E MQTT (AJUSTAR) ---
const char* ssid = "REDE";
const char* password = "SENHA_DA_REDE";

// CONFIGURAÇÕES DO BROKER
const char* mqtt_server = "IP_DA_MAQUINA";
const int mqtt_port = 1883; 

// Padrão de Inscrição da API: Estufa/+/sensor/+
const char* ID_DO_LOTE = "LOTE_TESTE_01"; 
const char* ID_DO_SENSOR = "ESTUFA_SENSOR_1"; 
const char* mqtt_topic_base = "Estufa"; 

// --- 2. CONFIGURAÇÕES DO SENSOR DHT11 ---
#define DHTPIN 33   
#define DHTTYPE DHT11 

// Tempo de intervalo entre leituras e publicações (em milissegundos)
const long interval = 5000; // 5 segundos
unsigned long previousMillis = 0;

// Variáveis para as leituras
float temperatura_c = 0.0;
float umidade_pct = 0.0;
float ph_valor = 7.0; // valor simulado

// Inicializa o objeto DHT
DHT dht(DHTPIN, DHTTYPE); 

// --- 3. OBJETOS DE CONEXÃO ---
WiFiClient espClient;
PubSubClient client(espClient);

// --- FUNÇÕES ---

// Função para iniciar a conexão Wi-Fi
void setup_wifi() {
    delay(10);
    Serial.println();
    Serial.print("Conectando-se a ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi conectado!");
    Serial.print("Endereço IP: ");
    Serial.println(WiFi.localIP());
}

// Função para reconectar ao broker MQTT
void reconnect() {
    while (!client.connected()) {
        Serial.print("Tentando conexão MQTT...");
        if (client.connect(ID_DO_SENSOR)) {
            Serial.println("conectado");
        } else {
            Serial.print("falhou, rc=");
            Serial.print(client.state());
            Serial.println(" tentando novamente em 5 segundos");
            delay(5000);
        }
    }
}

// Função para ler os sensores (Leitura Real do DHT11 + Simulação PH)
void ler_sensores() {
    // Leitura da umidade
    umidade_pct = dht.readHumidity();
    // Leitura da temperatura em Celsius
    temperatura_c = dht.readTemperature();

    // Simulação do sensor PH
    ph_valor = random(65, 75) / 10.0; 

    // Checa se as leituras do sensor falharam
    if (isnan(umidade_pct) || isnan(temperatura_c)) {
        Serial.println("Falha ao ler o DHT11!");
        // Não publica dados inválidos
        temperatura_c = 0.0;
        umidade_pct = 0.0;
        return; 
    }

    float bateria_pct = 85.0; // Simulação porcentagem da bateria

    Serial.print("T:");
    Serial.print(temperatura_c);
    Serial.print("°C | U:");
    Serial.print(umidade_pct);
    Serial.print("% | PH:");
    Serial.println(ph_valor);
}

// Função para publicar o JSON no MQTT
void publish_data() {
    // Somente publica se a temperatura e umidade forem válidas (> 0)
    if (temperatura_c == 0.0 && umidade_pct == 0.0) {
        Serial.println("Dados inválidos, não publicando.");
        return;
    }

    // Cria a string JSON com os dados
    String payload = "{";
    // RF005 - Separação por Lote: O lote_id é enviado no payload
    payload += "\"lote_id\":\"" + String(ID_DO_LOTE) + "\",";
    payload += "\"temp_c\":" + String(temperatura_c) + ",";
    payload += "\"umidade_pct\":" + String(umidade_pct) + ",";
    payload += "\"ph_valor\":" + String(ph_valor) + ","; // TODO: Implementar leitura real 
    payload += "\"bateria_pct\":" + String(85) + ","; // TODO: Implementar leitura real
    payload += "\"status\":\"OK\"";
    payload += "}";

    // Monta o tópico final (ex: Estufa/LOTE_TESTE_01/sensor/ESTUFA_SENSOR_1)
    // RF002 - Transmissão de Dados: Publicação no tópico MQTT
    String topic = String(mqtt_topic_base) + "/" + String(ID_DO_LOTE) + "/sensor/" + String(ID_DO_SENSOR);

    Serial.print("Publicando no tópico: ");
    Serial.println(topic);
    Serial.println(payload);

    // Publica a mensagem
    client.publish(topic.c_str(), payload.c_str());
}

// --- FUNÇÃO PRINCIPAL (SETUP) ---
void setup() {
    Serial.begin(115200);
    dht.begin(); // Inicializa o sensor DHT11

    setup_wifi(); // RNF002 - Conectividade Wi-Fi
    client.setServer(mqtt_server, mqtt_port);
}

// --- FUNÇÃO PRINCIPAL (LOOP) ---
void loop() {
    if (!client.connected()) {
        reconnect();
    }
    client.loop();

    unsigned long currentMillis = millis();

    // Verifica se é hora de enviar a próxima leitura
    if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis;

        ler_sensores(); 
        publish_data(); 
    }
}