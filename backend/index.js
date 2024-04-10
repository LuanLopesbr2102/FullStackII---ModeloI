import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rotaFuncionario from './Rotas/rotaFuncionario.js';
import rotaDepartamento from './Rotas/rotaDepartamento.js';
import rotaProjeto from './Rotas/rotaProjeto.js';
import rotaLogin from './Rotas/rotaLogin.js'
import rotaCliente from './Rotas/rotaCliente.js';
import session from 'express-session';
/*import { verificarAcesso } from './Auth/Autenticacao.js';*/

const host='localhost';
const porta='3001';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'cH4v3d0u5U4r10S3c3Cr3t4', //process.env.SECRET
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login',rotaLogin)
app.use('/cliente',rotaCliente);
app.use('/departamento'/*,verificarAcesso*/, rotaDepartamento);
app.use('/funcionario'/*,verificarAcesso*/, rotaFuncionario);
app.use('/projeto'/*,verificarAcesso*/, rotaProjeto);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
