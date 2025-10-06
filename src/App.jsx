import "./App.css";
import ContainerInformation from "./components/ContainerInformation";
import Graph from "./components/Graph";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col items-center">
      {/* Cabeçalho */}
      <div className="w-full h-[60px] bg-slate-500 flex justify-center items-center">
        <h1 className="text-4xl text-white font-extrabold text-center">
          Estufa de Secagem
        </h1>
      </div>

      {/* Containers de informação */}
      <div className="w-[95%] h-[17%] m-6 flex justify-around mb-[70px]">
        <ContainerInformation title="Temperatura" information="60 °C" />
        <ContainerInformation title="Umidade" information="14%" />
        <ContainerInformation title="Pressão" information="1 atm" />
      </div>
      <Graph />
    </div>
  );
}

export default App;
