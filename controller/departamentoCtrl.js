import Departamento from "../model/departamento.js";


export default class DepartamentoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const Nome = dados.Nome;
            const Localizacao = dados.Localizacao;
            const Chefedodepartamento = dados.Chefedodepartamento;
            const Dtacriacao = dados.Dtacriacao;
            const Descricao = dados.Descricao;
            const Orcamento = dados.Orcamento;
            const funcionario = dados.funcionario;
            if (Nome && Localizacao && Chefedodepartamento && Dtacriacao
                && Descricao && Orcamento > 0 && funcionario) {
                const departamento = new Departamento(0, Nome, Localizacao,
                    Chefedodepartamento, Dtacriacao, Descricao, Orcamento, funcionario
                );
                //resolver a promise
                departamento.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": departamento.id,
                        "mensagem": "Departamento cadastrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o departamento:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do departamento segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um departamento!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            const Nome = dados.Nome;
            const Localizacao = dados.Localizacao;
            const Chefedodepartamento = dados.Chefedodepartamento;
            const Dtacriacao = dados.Dtacriacao;
            const Descricao = dados.Descricao;
            const Orcamento = dados.Orcamento;
            const funcionario = dados.funcionario;
            if (id && Nome && Localizacao && Chefedodepartamento && Dtacriacao
                && Descricao && Orcamento > 0 && funcionario) {
                const departamento = new Departamento(id, Nome, Localizacao,
                    Chefedodepartamento, Dtacriacao, Descricao, Orcamento, funcionario);
                //resolver a promise
                departamento.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Departamento atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o departamento:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do departamento segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um departamento!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            if (id) {
                const departamento = new Departamento(id);
                //resolver a promise
                departamento.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Departamento excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o departamento:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do departamento!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um departamento!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const departamento = new Departamento();
            departamento.consultar(termo).then((listaDepartamentos) => {
                resposta.json(
                    {
                        status: true,
                        listaDepartamentos
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter o departamento: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar Departamentos!"
            });
        }
    }
}