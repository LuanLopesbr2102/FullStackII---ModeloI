import express from 'express';
import cors from 'cors';
import rotaFuncionario from './routes/rotaFuncionario.js';
import rotaDepartamento from './routes/rotaDepartamento.js';

const host='0.0.0.0';
const porta='3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/categoria',rotaFuncionario);
app.use('/produto',rotaDepartamento);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
