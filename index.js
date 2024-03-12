import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
import rotaFuncionario from './Rotas/rotaFuncionario.js';
import rotaDepartamento from './Rotas/rotaDepartamento.js';
import rotaLogin from './Rotas/rotaLogin.js'
=======
import rotaFuncionario from './routes/rotaFuncionario.js';
import rotaDepartamento from './routes/rotaDepartamento.js';
import rotaLogin from './routes/rotaLogin.js'
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Auth/Autenticacao.js';

const host='0.0.0.0';
const porta='3000';

dotenv.config();

<<<<<<< HEAD
=======

>>>>>>> f544b11078ae957bff650b1da6264467db387f7a
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
<<<<<<< HEAD
    secret: "cH4v3d0u5U4r10S3c3Cr3t4", //process.env.SECRET
=======
    secret: process.env.SECRET,
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

app.use('/login',rotaLogin)
<<<<<<< HEAD
app.use('/departamento',verificarAcesso, rotaDepartamento);
app.use('/funcionario',verificarAcesso, rotaFuncionario);
=======
app.use('/Funcionario',verificarAcesso,rotaFuncionario);
app.use('/Departamento',verificarAcesso,rotaDepartamento);
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
