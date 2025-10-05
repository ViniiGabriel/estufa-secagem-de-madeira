import { useState } from "react";
import "./App.css";
import ContainerInformation from "./components/ContainerInformation";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col">
      <div className="w-full h-[70px] bg-slate-500 flex justify-center items-center pt-[10px]">
        <h1 className="text-4xl text-white font-extrabold text-center mb-4">
          Estufa de Secagem
        </h1>
      </div>
      <div className="w-[95%] h-[400px] m-6 flex">
        <ContainerInformation title={"Temperatura"} information={"60 °C"} />
        <ContainerInformation title={"Umidade"} information={"14%"} />
        <ContainerInformation title={"Pressão"} information={"1 atm"} />
      </div>
    </div>
  );
}

export default App;
