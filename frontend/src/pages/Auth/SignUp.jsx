import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    if (!fullName) {
      setError("Por favor, introduza o seu nome");
      return;
    }
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
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
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
        setError("Ocorreu um erro. Por favor, tente novamente");
      }
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-green-900'>Crie uma conta</h3>
        <p className='text-xs text-green-800 mt-[5px] mb-6'>
          Junte-se a nós
        </p>
        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='col-span-2 md:col-span-1'>
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Nome completo"
                placeholder="Joao"
                type="text"
              />
            </div>

            <div className='col-span-2 md:col-span-1'>
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Endereço de email"
                placeholder="joao@exemplo.com"
                type="text"
              />
            </div>

            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Palavra-passe"
                placeholder="Min 8 caracteres"
                type="password"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button
            type='submit'
            className='bg-green-900 hover:bg-green-950 text-white px-4 py-2 rounded-md w-full mt-3 transition-colors duration-200'
          >
            Criar conta
          </button>

          <p className='text-[13px] text-green-900 mt-3'>
            Já tem uma conta?{" "}
            <Link className="font-medium text-green-800 underline" to="/login">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
