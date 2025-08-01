// Importa o módulo 'jsonwebtoken' para criação e verificação de tokens JWT (JSON Web Token)
const jwt = require('jsonwebtoken');

// Importa o modelo 'User' que representa os utilizadores no banco de dados
const User = require('../models/User');

// Middleware que protege rotas privadas, garantindo que apenas utilizadores autenticados tenham acesso
exports.protect = async (req, res, next) => {
    // Inicializa a variável token e tenta extrair o token do cabeçalho "Authorization"
    // O formato esperado do cabeçalho é: "Bearer <token>"
    let token = req.headers.authorization?.split(" ")[1];

    // Se nenhum token for encontrado, envia uma resposta de erro 401 (Não autorizado)
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        // Verifica a validade do token utilizando a chave secreta armazenada em variáveis de ambiente
        // Se o token for válido, o conteúdo decodificado será armazenado em "decoded"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Usa o ID decodificado do token para buscar o utilizador correspondente no banco de dados
        // A função ".select('-password')" garante que o campo da senha não seja incluído na resposta
        req.user = await User.findById(decoded.id).select('-password');

        // O utilizador autenticado é agora acessível via "req.user" para os próximos middlewares ou controladores
        next(); // Continua o fluxo da requisição normalmente
    } catch (err) {
        // Se houver qualquer erro na verificação do token (ex: inválido, expirado, mal formado)
        // Retorna erro 401 (Não autorizado)
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
