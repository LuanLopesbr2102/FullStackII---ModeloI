import express from 'express';
import cors from 'cors';
import rotaFuncionario from './routes/rotaFuncionario.js';
import rotaDepartamento from './routes/rotaDepartamento.js';
import rotaLogin from './routes/rotaLogin.js'
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Auth/Autenticacao.js';

const host='0.0.0.0';
const porta='3000';

dotenv.config();


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login',rotaLogin)
app.use('/Funcionario',verificarAcesso,rotaFuncionario);
app.use('/Departamento', verificarAcesso,rotaDepartamento);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
