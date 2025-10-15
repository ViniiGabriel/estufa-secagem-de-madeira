import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ContainerInformation from "./components/ContainerInformation";
import Dropdown from "./components/Dropdown";
import Graph from "./components/Graph";
import TableEstufas from "./components/TableEstufas";
import { fetchEstufas } from "./data/estufas";

function App() {
  const [estufas, setEstufas] = useState([]);
  const [estufaSelecionada, setEstufaSelecionada] = useState(null);
  const [adminUser, setAdminUser] = useState(null); // estado do admin logado
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      setAdminUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    async function carregarEstufas() {
      const dados = await fetchEstufas();
      setEstufas(dados);
      setEstufaSelecionada(dados[0] || null);
    }
    carregarEstufas();
  }, []);

  const handleSelectEstufa = (nomeEstufa) => {
    if (nomeEstufa === "Todas as estufas") {
      setEstufaSelecionada(null);
    } else {
      const estufa = estufas.find((e) => e.nome === nomeEstufa);
      setEstufaSelecionada(estufa);
    }
  };

  if (estufas.length === 0) {
    return <div className="text-center mt-20">Carregando dados...</div>;
  }

  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col items-center">
      <div className="w-full h-[60px] bg-slate-500 flex items-center justify-center relative">
        <h1 className="text-4xl text-white font-extrabold text-center">
          Estufa de Secagem
        </h1>

        {adminUser ? (
          <div className="absolute right-4 flex gap-2">
            <button
              className="bg-slate-400 text-white px-4 py-1 rounded hover:bg-slate-300 transition"
              onClick={() => navigate("/admin")}
            >
              Painel
            </button>
            <button
              className="bg-slate-400 text-white px-4 py-1 rounded hover:bg-slate-300 transition"
              onClick={() => {
                localStorage.removeItem("adminUser");
                setAdminUser(null);
              }}
            >
              Sair
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="absolute right-4 bg-slate-400 text-slate-700 px-6 py-1 rounded hover:bg-slate-300"
          >
            Login
          </button>
        )}
      </div>

      <div className="w-[95%] h-[10%] m-6 flex justify-end">
        <Dropdown
          options={estufas.map((e) => e.nome)}
          onSelect={handleSelectEstufa}
        />
      </div>

      {estufaSelecionada ? (
        <>
          <div className="w-[95%] h-[17%] m-6 flex justify-around mb-[-100px]">
            <ContainerInformation
              title="Temperatura"
              information={estufaSelecionada.temperatura}
            />
            <ContainerInformation
              title="Umidade"
              information={estufaSelecionada.umidade}
            />
            <ContainerInformation
              title="Pressão"
              information={estufaSelecionada.pressao}
            />
          </div>

          <div className="w-screen h-[100%] flex justify-center items-center gap-8">
            <Graph
              graphType={"Temperatura [°C]"}
              graphData={estufaSelecionada.graficos.temperatura}
            />
            <Graph
              graphType={"Umidade [%]"}
              graphData={estufaSelecionada.graficos.umidade}
            />
            <Graph
              graphType={"Pressão [atm]"}
              graphData={estufaSelecionada.graficos.pressao}
            />
          </div>
        </>
      ) : (
        <TableEstufas estufas={estufas} />
      )}
    </div>
  );
}

export default App;
