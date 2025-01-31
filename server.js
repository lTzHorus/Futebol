const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
const uri = "mongodb+srv://marquesluna777:Ah2a1mMqf621IVrV@cluster0.dhsa7.mongodb.net/futebol_db?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Conexão com o MongoDB estabelecida com sucesso");
});

// Schema e Model
const mensalistaSchema = new mongoose.Schema({
    nome: String,
    telefone: String,
    dataNascimento: Date,
    plano: String,
    valorMensalidade: Number,
    mesPagamento: String
});

const Mensalista = mongoose.model('Mensalista', mensalistaSchema);

// Rotas
app.get('/api/mensalistas', async (req, res) => {
    const mensalistas = await Mensalista.find();
    res.json(mensalistas);
});

app.post('/api/mensalistas', async (req, res) => {
    const novoMensalista = new Mensalista(req.body);
    await novoMensalista.save();
    res.status(201).json(novoMensalista);
});

app.delete('/api/mensalistas/:id', async (req, res) => {
    await Mensalista.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Rota para servir o frontend
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});