import { Router } from "express";
import CandVagaCtrl from "../Controller/candidato_VagaCtrl.js";



const CandVgCtrl = new CandVagaCtrl();
const rotaInscricao = new Router();

rotaInscricao
.get('/',CandVgCtrl.consultar)
.get('/:termo', CandVgCtrl.consultar)
.post('/',CandVgCtrl.gravar)
//.patch('/',CandVgCtrl.atualizar)
//.put('/',CandVgCtrl.atualizar)
//.delete('/',CandVgCtrl.excluir);

export default rotaInscricao;