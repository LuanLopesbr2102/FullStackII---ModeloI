import Projeto from "../Modelo/projeto.js";
import Funcionario from "../Modelo/funcionario.js";
import funcionarioProjeto from "../Modelo/funcionarioProjeto.js";
import Cliente from "../Modelo/Cliente.js";
//import Departamento from "../Modelo/departamento.js";

export default class ProjetoCtrl{
    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')){
            const dados = requisicao.body;
            //extraindo dados de um novo pedido
            const cliente = dados.cliente;
            const nomeProjeto = dados.nomeProjeto;
            const descricao = dados.descricao
            const dataInicio = new Date(dados.dataInicio).toLocaleDateString();
            const dataFinal = new Date(dados.dataFinal).toLocaleDateString();
            const orcamento = dados.orcamento;
            const funcionarioProjote = dados.funcs;
            //instanciando um objeto do tipo Pedido
            const objCliente = new Cliente(cliente.id);
            //instanciando uma lista de objetos do tipo ItensPedido
            let funcs = [];
            for (const func of funcionarioProjote){
                //instanciando um objeto do tipo Produto
                const funciona = new Funcionario(func.id);
                //instanciando um objeto do tipo ItemPedido
                const funcProj = new funcionarioProjeto(funciona, new Date(func.dataAtribuicao).toLocaleDateString(), func.fp_descricao);
                funcs.push(funcProj);
            }
            const projeto = new Projeto(0,objCliente,nomeProjeto, descricao, dataInicio, dataFinal,orcamento,funcs);
            //resolver a promise
            projeto.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "codigo": projeto.id,
                    "mensagem": "Projeto registrado com sucesso!"
                    
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao registrar o pedido: " + erro.message
                });
            });
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!" 
            })
        
        }
        
    }

    consultar(requisicao, resposta){
        resposta.type('application/json');  
        if (requisicao.method === 'GET'){
            //tentar obter o código do pedido a partir dos parâmetros da URL 
            let termo = requisicao.params.termo;
            if (!isNaN(termo)){
                const projeto = new Projeto(0);
                projeto.consultar(termo).then((listaProjeto)=>{
                    resposta.status(200).json({
                        "status": true,
                        "listaProjeto": listaProjeto
                    })
                })
                .catch((erro)=>{
                    console.log(erro)
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar o pedido: " + erro
                        
                    });
                    
                })
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe um códido de pedido válido!"
                });
            }
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        }     
    }
}