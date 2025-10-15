import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      await Axios.post("http://localhost:5000/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      alert("Admin cadastrado com sucesso!");
      navigate("/admin"); // volta para o painel após cadastro
    } catch (error) {
      if (error.response?.status === 409) {
        setErrors({ email: "Este email já está em uso" });
      } else {
        alert("Erro ao conectar com o servidor.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationRegister = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("Campo obrigatório"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Cadastrar Novo Admin
        </h1>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleRegister}
          validationSchema={validationRegister}
        >
          <Form className="space-y-5">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Field
                name="username"
                type="text"
                placeholder="Digite seu username"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage
                component="span"
                name="username"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Digite seu email"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage
                component="span"
                name="email"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Digite sua senha"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage
                component="span"
                name="password"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Cadastrar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;
