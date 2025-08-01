import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Por favor, introduza um endereço de email válido");
      return;
    }
    if (!password) {
      setError("Por favor, introduza a palavra-passe");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Ocorreu um erro. Por favor, tente novamente.");
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-green-900'>Bem-vindo</h3>
        <p className='text-xs text-green-800 mt-[5px] mb-6'>
          Introduza as suas credenciais
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Endereço de email"
            placeholder="joao@exemplo.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Palavra-passe"
            placeholder="Min 8 caracteres"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button
            type='submit'
            className='bg-green-900 hover:bg-green-950 text-white px-4 py-2 rounded-md w-full mt-3 transition-colors duration-200'
          >
            Entrar
          </button>

          <p className='text-[13px] text-green-900 mt-3'>
            Ainda não tem uma conta?{" "}
            <Link className="font-medium text-green-800 underline" to="/signup">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )

}

export default Login
