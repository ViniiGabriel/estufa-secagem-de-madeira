import "./App.css";
import ContainerInformation from "./components/ContainerInformation";
import Graph from "./components/Graph";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col items-center">
      <div className="w-full h-[60px] bg-slate-500 flex justify-center items-center">
        <h1 className="text-4xl text-white font-extrabold text-center">
          Estufa de Secagem
        </h1>
      </div>

      <div className="w-[95%] h-[17%] m-6 flex justify-around mb-[-100px]">
        <ContainerInformation title="Temperatura" information="60 °C" />
        <ContainerInformation title="Umidade" information="14%" />
        <ContainerInformation title="Pressão" information="1 atm" />
      </div>

      <div className="w-screen h-[100%] flex justify-center items-center gap-8">
        <Graph
          graphType={"Temperatura [°C]"}
          graphData={[100, 20, 50, 55, 60]}
        />
        <Graph graphType={"Umidade [%]"} graphData={[20, 40, 10, 70, 40]} />
        <Graph graphType={"Pressão [atm]"} graphData={[70, 10, 20, 55, 60]} />
      </div>
    </div>
  );
}

export default App;
