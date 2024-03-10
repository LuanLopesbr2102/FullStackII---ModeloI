import { Router } from "express";
import FuncionarioCtrl from "../controller/FuncionarioCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const funCtrl = new FuncionarioCtrl();
const rotaFuncionario = new Router();

rotaFuncionario
.get('/',funCtrl.consultar)
.get('/:termo', funCtrl.consultar)
.post('/',funCtrl.gravar)
.patch('/',funCtrl.atualizar)
.put('/',funCtrl.atualizar)
.delete('/',funCtrl.excluir);

export default rotaFuncionario;