import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastrarSensor() {
  const [lotes, setLotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLotes = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/api/lotes");
        setLotes(response.data);
      } catch (error) {
        console.error("Erro ao buscar lotes:", error);
      }
    };
    fetchLotes();
  }, []);

  const validationSchema = yup.object().shape({
    endereco_mac: yup
      .string()
      .matches(
        /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/,
        "MAC inválido (ex: AA:BB:CC:DD:EE:FF)"
      )
      .required("Informe o endereço MAC"),
    lote_id: yup.string().required("Selecione uma estufa/lote"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await Axios.post("http://localhost:5000/api/sensores", values);
      alert("Sensor cadastrado com sucesso!");
      resetForm();
      navigate("/sensores");
    } catch (error) {
      console.error("Erro ao cadastrar sensor:", error);
      alert("Erro ao cadastrar sensor.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold text-center text-slate-700 mb-6">
          Cadastrar Sensor
        </h2>

        <Formik
          initialValues={{ endereco_mac: "", lote_id: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {/* Seleção de Estufa */}
              <div className="flex flex-col">
                <label
                  htmlFor="lote_id"
                  className="text-slate-600 font-medium mb-1"
                >
                  Estufa / Lote
                </label>
                <Field
                  as="select"
                  name="lote_id"
                  className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <option value="">Selecione...</option>
                  {lotes.map((lote) => (
                    <option key={lote.lote_id} value={lote.lote_id}>
                      {lote.nome_lote}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="lote_id"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Endereço MAC */}
              <div className="flex flex-col">
                <label
                  htmlFor="endereco_mac"
                  className="text-slate-600 font-medium mb-1"
                >
                  Endereço MAC
                </label>
                <Field
                  name="endereco_mac"
                  placeholder="AA:BB:CC:DD:EE:FF"
                  className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <ErrorMessage
                  name="endereco_mac"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Botões */}
              <div className="flex flex-col gap-3 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-400 transition"
                >
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Sensor"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/sensores")}
                  className="bg-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-200 transition"
                >
                  Voltar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CadastrarSensor;
