import Fornecedor from "../model/fornecedor.js";
import Produto from "../model/produto.js";
import ProdutoDepartamento from "../model/produtoDepartamento.js";
import Departamento from "../model/departamento.js";

export default class ProdutoCtrl{

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const descricao = dados.descricao;
            const preco = dados.preco;
            const noquantidadeEstoqueme = dados.quantidadeEstoque;
            const fornecedor = dados.fornecedor;
            const produtoDepartamento = dados.Departamentos;

            const objFornecedor = new Fornecedor(fornecedor.id)

            let Departamentos = [];
            for (const departamento of produtoDepartamento) {
                const departamentos = new Departamento(departamento.id);
              //resolver a promise
                produto.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": produto.id,
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
            
        }
        
        
    }

}