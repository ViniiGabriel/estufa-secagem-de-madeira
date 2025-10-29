import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleClickLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await Axios.post("http://localhost:5000/login", {
        email: values.email,
        password: values.password,
      });

      console.log(response.data);

      localStorage.setItem("adminUser", JSON.stringify(response.data.user));
      navigate("/admin");
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors({ email: "Credenciais inválidas" });
      } else {
        alert("Erro ao conectar com o servidor.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationLogin = yup.object().shape({
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
          Admin Login
        </h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleClickLogin}
          validationSchema={validationLogin}
        >
          <Form className="space-y-5">
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
              className="w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-400 transition-colors font-semibold"
            >
              Entrar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
