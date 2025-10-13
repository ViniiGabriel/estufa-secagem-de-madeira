import { useState } from "react";
import "./App.css";
import ContainerInformation from "./components/ContainerInformation";
import Dropdown from "./components/Dropdown";
import Graph from "./components/Graph";
import TableEstufas from "./components/TableEstufas";
import estufas from "./data/estufas";

function App() {
  const [estufaSelecionada, setEstufaSelecionada] = useState(estufas[0]);

  const handleSelectEstufa = (nomeEstufa) => {
    if (nomeEstufa === "Todas as estufas") {
      setEstufaSelecionada(null);
    } else {
      const estufa = estufas.find((e) => e.nome === nomeEstufa);
      setEstufaSelecionada(estufa);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col items-center">
      <div className="w-full h-[60px] bg-slate-500 flex justify-center items-center">
        <h1 className="text-4xl text-white font-extrabold text-center">
          Estufa de Secagem
        </h1>
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
