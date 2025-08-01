// Importa o módulo 'multer' para lidar com uploads de arquivos no Node.js
const multer = require('multer')

// Configuração de armazenamento (onde e como os arquivos serão salvos)
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos serão armazenados
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 'uploads/' é a pasta onde os arquivos serão salvos
    },
    // Define o nome do arquivo salvo
    filename: (req, file, cb) => {
        // Nome do arquivo será: timestamp atual + nome original do arquivo
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Filtro de tipos de arquivos permitidos
const fileFilter = (req, file, cb) => {
    // Tipos MIME permitidos: JPEG, JPG e PNG
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    
    // Verifica se o tipo do arquivo está entre os permitidos
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceita o upload
    } else {
        // Rejeita o upload com uma mensagem de erro
        cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
    }
};

// Cria o middleware do Multer com as configurações de armazenamento e filtro
const upload = multer({ storage, fileFilter });

// Exporta o middleware para ser usado em rotas (ex: app.post('/upload', upload.single('file'), ...))
module.exports = upload;
