import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function SensoresList() {
  const [lotes, setLotes] = useState([]);
  const [sensores, setSensores] = useState([]);
  const [loteSelecionado, setLoteSelecionado] = useState("");
  const navigate = useNavigate();

  // 🔹 Buscar todos os lotes para o dropdown
  async function fetchLotes() {
    try {
      const res = await Axios.get("http://localhost:5000/api/lotes");
      setLotes(res.data);
    } catch (error) {
      console.error("Erro ao buscar lotes:", error);
    }
  }

  // 🔹 Buscar sensores de um lote específico
  async function fetchSensoresPorLote(lote_id) {
    if (!lote_id) {
      setSensores([]);
      return;
    }

    try {
      const res = await Axios.get(
        `http://localhost:5000/api/sensores?lote_id=${encodeURIComponent(
          lote_id
        )}`
      );
      setSensores(res.data);
    } catch (error) {
      console.error("Erro ao carregar sensores:", error);
      setSensores([]);
    }
  }

  useEffect(() => {
    fetchLotes();
  }, []);

  useEffect(() => {
    if (loteSelecionado) {
      fetchSensoresPorLote(loteSelecionado);
    } else {
      setSensores([]);
    }
  }, [loteSelecionado]);

  // 🔹 Deletar sensor
  const handleDelete = async (sensor_id) => {
    if (!window.confirm("Deseja realmente excluir este sensor?")) return;
    try {
      await Axios.delete(`http://localhost:5000/api/sensores/${sensor_id}`);
      setSensores(sensores.filter((s) => s.sensor_id !== sensor_id));
      alert("Sensor excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir sensor:", error);
      alert("Erro ao excluir sensor");
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-200 min-h-screen p-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[80%]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-700">
            Lista de Sensores
          </h1>
          <button
            onClick={() => navigate("/cadastrar-sensor")}
            className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-400 transition"
          >
            + Cadastrar Sensor
          </button>
        </div>

        {/* 🔽 Dropdown de seleção da estufa */}
        <div className="flex flex-col mb-6">
          <label
            htmlFor="lote"
            className="text-slate-700 font-medium mb-1 text-lg"
          >
            Selecione uma Estufa
          </label>
          <select
            id="lote"
            value={loteSelecionado}
            onChange={(e) => setLoteSelecionado(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 w-[300px]"
          >
            <option value="">-- Escolha uma estufa --</option>
            {lotes.map((lote) => (
              <option key={lote.lote_id} value={lote.lote_id}>
                {lote.nome_lote}
              </option>
            ))}
          </select>
        </div>

        {/* 🧭 Exibição condicional da tabela */}
        {!loteSelecionado ? (
          <p className="text-center text-slate-500">
            Selecione uma estufa para visualizar os sensores.
          </p>
        ) : sensores.length === 0 ? (
          <p className="text-center text-slate-500">
            Nenhum sensor cadastrado para esta estufa.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="border p-2">ID</th>
                <th className="border p-2">Endereço MAC</th>
                <th className="border p-2">Data de Cadastro</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sensores.map((s) => (
                <tr key={s.sensor_id} className="text-center hover:bg-slate-50">
                  <td className="border p-2">{s.sensor_id}</td>
                  <td className="border p-2">{s.endereco_mac}</td>
                  <td className="border p-2">
                    {s.data_cadastro
                      ? new Date(s.data_cadastro).toLocaleString("pt-BR")
                      : "-"}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(s.sensor_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        onClick={() => navigate("/admin")}
        className="mt-6 bg-slate-400 text-white px-6 py-2 rounded-lg hover:bg-slate-300 transition"
      >
        Voltar
      </button>
    </div>
  );
}

export default SensoresList;
