import React, { useState, useId } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

// Componente de input customizado com suporte para mostrar/ocultar senha
const Input = ({ value, onChange, placeholder, label, type }) => {
    // Estado para controlar se a senha está visível ou oculta
    const [showPassword, setShowPassword] = useState(false);

    // Gera um ID único para associar o label ao input, melhorando acessibilidade
    const id = useId();

    // Função que alterna entre mostrar e esconder a senha
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            {/* Label associado ao input via htmlFor e id */}
            <label htmlFor={id} className='text-[13px] text-slate-800'>{label}</label>
            
            {/* Container do input e do ícone */}
            <div className='input-box'>
                <input
                    id={id}
                    // Se for input de senha, alterna tipo entre 'text' e 'password' conforme estado showPassword
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none'
                    value={value}
                    onChange={onChange}
                />
                {/* Ícone para mostrar/ocultar senha aparece só se o tipo for password */}
                {type === 'password' && (
                    showPassword ? (
                        // Ícone olho aberto para indicar senha visível
                        <FaRegEye
                            size={22}
                            className='text-primary cursor-pointer'
                            onClick={toggleShowPassword}
                        />
                    ) : (
                        // Ícone olho cortado para indicar senha oculta
                        <FaRegEyeSlash
                            size={22}
                            className='text-slate-400 cursor-pointer'
                            onClick={toggleShowPassword}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Input;
