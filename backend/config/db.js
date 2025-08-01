// Importa a biblioteca mongoose, usada para conectar e interagir com o MongoDB
const mongoose = require("mongoose");

// Define uma função assíncrona para conectar à base de dados
const connectDB = async () => {
    try {
        // Tenta estabelecer a conexão com o MongoDB usando a URI armazenada nas variáveis de ambiente
        await mongoose.connect(process.env.MONGO_URI, {
            // Aqui pode-se configurar opções adicionais, como useNewUrlParser, useUnifiedTopology, etc.
        });

        // Loga uma mensagem no console caso a conexão seja bem-sucedida
        console.log("MongoDB connected");
    } catch (err) {
        // Caso ocorra um erro na conexão, exibe-o no console
        console.error("Error connecting to MongoDB", err);

        // Encerra o processo com código de erro (1) para indicar falha
        process.exit(1);
    }
};

// Exporta a função para que possa ser usada em outras partes da aplicação
module.exports = connectDB;
