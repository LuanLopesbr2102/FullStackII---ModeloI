import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rotaVagas from './Rotas/rotaVaga.js';
import rotaCandidatos from './Rotas/rotaCandidato.js';
import rotaInscricao from './Rotas/rotacandidato_Vaga.js'
import session from 'express-session';
/*import { verificarAcesso } from './Auth/Autenticacao.js';*/

const host='localhost';
const porta='4000';

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



app.use('/candidatos', rotaCandidatos);
app.use('/vagas', rotaVagas);
app.use('/inscricoes', rotaInscricao);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
