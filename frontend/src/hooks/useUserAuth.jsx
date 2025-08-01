import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"
import { useContext, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import {API_PATHS} from "../utils/apiPaths"

export const useUserAuth = () => {
    // Obtém o estado do usuário e funções para atualizá-lo ou limpá-lo
    const { user, updateUser, clearUser } = useContext(UserContext);

    const navigate = useNavigate(); // Hook para redirecionar programaticamente

    useEffect(() => {
        // Se o usuário já estiver no contexto, não faz nada
        if (user) return;

        let isMounted = true; // Evita atualizações de estado após desmontagem do componente

        const fetchUserInfo = async () => {
            try {
                // Requisição para obter as informações do usuário autenticado
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                // Atualiza o contexto com os dados recebidos, se o componente ainda estiver montado
                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Falha ao buscar informações do usuário:", error);

                // Se não autorizado ou erro, limpa o contexto e redireciona para login
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        // Limpeza: evita chamadas de estado após desmontagem do componente
        return () => {
            isMounted = false;
        };
    }, [updateUser, clearUser, navigate]);
};
