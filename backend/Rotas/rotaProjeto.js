import { Router } from "express";
import ProjetoCtrl from "../Controle/projetoCtrl.js";


const projCtrl = new ProjetoCtrl();
const rotaProjeto = new Router();

rotaProjeto
.get('/',projCtrl.consultar)
.get('/:termo', projCtrl.consultar)
.post('/',projCtrl.gravar)
//.patch('/',projCtrl.atualizar)
//.put('/',projCtrl.atualizar)
//.delete('/',projCtrl.excluir);

export default rotaProjeto;