import { Router } from "express";
import VagaCtrl from "../Controller/vagaCtrl.js";

const vagaCtrl = new VagaCtrl();
const rotaVagas = new Router();

rotaVagas
.get('/', vagaCtrl.consultar)
.get('/:termo', vagaCtrl.consultar)
.post('/', vagaCtrl.gravar)
.patch('/', vagaCtrl.atualizar)
.put('/', vagaCtrl.atualizar)
.delete('/', vagaCtrl.excluir);

export default rotaVagas;