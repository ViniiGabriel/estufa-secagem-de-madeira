# 🌲 Estufa de Secagem de Madeira

Aplicativo web desenvolvido para **monitoramento de uma estufa de secagem de madeira**, exibindo informações de **temperatura, umidade e pressão**, além de **gráficos interativos** que mostram a evolução dos dados ao longo do tempo.

---

## ⚙️ Tecnologias utilizadas

Este projeto foi construído com as seguintes tecnologias:

- ⚛️ **React** – biblioteca JavaScript para criação de interfaces dinâmicas  
- ⚡ **Vite** – ambiente de desenvolvimento rápido e leve  
- 📊 **Chart.js** – biblioteca de gráficos interativos  
- 🎨 **Tailwind CSS** – framework CSS utilitário para estilização responsiva  
- 🧱 **JavaScript (ES6+)**  
- 🧩 **Componentes React personalizados** (`ContainerInformation`, etc.)

---

## 🚀 Como executar o projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/ViniiGabriel/estufa-secagem-de-madeira.git
cd estufa-secagem-de-madeira
```

### 2️⃣ Instalar dependências
```bash
npm install
# ou
yarn install
```

### 3️⃣ Rodar o projeto em modo de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

Depois disso, abra o navegador no endereço indicado (geralmente `http://localhost:5173`).

### 4️⃣ Gerar build de produção
```bash
npm run build
# ou
yarn build
```

---

## 📊 Funcionalidades

✅ Exibição de métricas principais:
- Temperatura atual  
- Umidade  
- Pressão atmosférica  

✅ Gráfico de linha interativo (Chart.js):
- Mostra a variação de temperatura ao longo do tempo  
- Captura o clique do usuário no gráfico e converte em coordenadas (x, y)  
- Renderização responsiva  

✅ Interface moderna e responsiva com Tailwind CSS  
