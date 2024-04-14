import { Router } from "express";
import CandidatoCtrl from "../Controller/candidatoCtrl.js";

const cdCtrl = new CandidatoCtrl();
const rotaCandidatos = new Router();

rotaCandidatos
.get('/', cdCtrl.consultar)
.get('/:termo', cdCtrl.consultar)
.post('/', cdCtrl.gravar)
.patch('/', cdCtrl.atualizar)
.put('/', cdCtrl.atualizar)
.delete('/', cdCtrl.excluir);

export default rotaCandidatos;