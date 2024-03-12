//camada de interface da API que traduz HTTP
<<<<<<<< HEAD:controller/funcionarioCtrl.js
import Funcionarios from "../Modelo/funcionario.js";
========
import Funcionarios from "../model/funcionario.js";
>>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:controller/FuncionarioCtrl.js

export default class FuncionarioCtrl {
/* */

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
<<<<<<<< HEAD:controller/funcionarioCtrl.js
            const nome = dados.nome;
            const departamento = dados.departamento;
            if (nome && departamento ) {
                const funcionarios = new Funcionarios(0, nome, departamento);
========
            const Nome = dados.Nome;
            const departamento = dados.departamento;
            if (Nome && departamento ) {
                const funcionarios = new Funcionarios(0, Nome, departamento);
>>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:controller/FuncionarioCtrl.js
                //resolver a promise
                funcionarios.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": funcionarios.id,
                        "mensagem": "Funcionario registrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a funcionario:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição do funcionario!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um funcionario!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
<<<<<<<< HEAD:controller/funcionarioCtrl.js
            const nome = dados.nome;
            const departamento = dados.departamento;
          
            if (id && nome && departamento) {
                const funcionarios = new Funcionarios(id, nome, departamento);
========
            const Nome = dados.Nome;
            const departamento = dados.departamento;
          
            if (id && Nome) {
                const funcionarios = new Funcionarios(id, Nome, departamento);
>>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:controller/FuncionarioCtrl.js
                //resolver a promise
                funcionarios.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Funcionario atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o Funcionario:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e a descrição do Funcionario!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um Funcionario!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            if (id) {
                const funcionario = new Funcionarios(id);
                //resolver a promise
                funcionario.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Funcionario excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o funcionario:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do funcionario!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um funcionario!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const funcionario = new Funcionarios();
            funcionario.consultar(termo).then((listafuncionario)=>{
                resposta.json(
                    {
                        status:true,
                        listafuncionario
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter o funcionario: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar o funcionario!"
            });
        }
    }
}