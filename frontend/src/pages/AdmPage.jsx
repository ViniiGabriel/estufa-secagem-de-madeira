import { useNavigate } from "react-router-dom";

function AdmPage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col items-center">
      <div className="w-full h-[60px] bg-slate-500 flex items-center justify-center relative shadow-md">
        <h1 className="text-3xl text-white font-extrabold text-center">
          Painel Administrativo
        </h1>

        <div className="absolute left-4 flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-slate-300 text-slate-800 px-4 py-1 rounded hover:bg-slate-400 transition"
          >
            Voltar
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700 mb-2">
            Bem-vindo, Administrador!
          </h2>
          <p className="text-slate-600 text-lg">
            Escolha uma das opções abaixo para gerenciar o sistema.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <button
            onClick={() => navigate("/cadastrar-estufa")}
            className="bg-slate-500 hover:bg-slate-400 text-white px-8 py-3 rounded-2xl shadow-md font-semibold text-lg transition"
          >
            Cadastrar Nova Estufa
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-slate-500 hover:bg-slate-400 text-white px-8 py-3 rounded-2xl shadow-md font-semibold text-lg transition"
          >
            Cadastrar Novo Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdmPage;
