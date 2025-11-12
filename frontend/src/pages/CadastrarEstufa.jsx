import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function CadastrarEstufa() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await Axios.post("http://localhost:5000/api/lotes", {
        nome_lote: values.nome,
        endereco_mac: values.endereco_mac,
      });

      alert("Estufa cadastrada com sucesso!");
      navigate("/", { state: { novaEstufa: response.data } });
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar a estufa.");
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = yup.object().shape({
    nome: yup.string().required("Nome da estufa é obrigatório"),
    endereco_mac: yup
      .string()
      .matches(
        /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/,
        "MAC inválido (ex: AA:BB:CC:DD:EE:FF)"
      )
      .required("Endereço MAC é obrigatório"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Cadastrar Nova Estufa
        </h1>

        <Formik
          initialValues={{ nome: "", endereco_mac: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="space-y-5">
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Nome da Estufa
              </label>
              <Field
                name="nome"
                placeholder="Digite o nome da estufa"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage
                component="span"
                name="nome"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Endereço MAC
              </label>
              <Field
                name="endereco_mac"
                placeholder="Ex: AA:BB:CC:DD:EE:FF"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage
                component="span"
                name="endereco_mac"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Cadastrar
            </button>
          </Form>
        </Formik>

        <button
          onClick={() => navigate("/admin")}
          className="w-full mt-4 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
        >
          Voltar ao Painel
        </button>
      </div>
    </div>
  );
}

export default CadastrarEstufa;
