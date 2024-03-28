import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rotaFuncionario from './Rotas/rotaFuncionario.js';
import rotaDepartamento from './Rotas/rotaDepartamento.js';
import rotaLogin from './Rotas/rotaLogin.js'
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
    secret: "cH4v3d0u5U4r10S3c3Cr3t4", //process.env.SECRET
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login',rotaLogin)
app.use('/departamento',verificarAcesso, rotaDepartamento);
app.use('/funcionario',verificarAcesso, rotaFuncionario);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
