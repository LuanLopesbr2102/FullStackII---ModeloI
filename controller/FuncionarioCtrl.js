//camada de interface da API que traduz HTTP
import Funcionarios from "../model/funcionario.js";

export default class FuncionarioCtrl {
/* #id;
#Nome;
#Cargo;
#Salario;
#Dtadecontratacao;
#Email;
#DataNasc;*/

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const Nome = dados.Nome;
            
            if (Nome) {
                const funcionarios = new Funcionarios(0,Nome);
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
            const Nome = dados.Nome;
          
            if (id && Nome) {
                const funcionarios = new Funcionarios(id, Nome);
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