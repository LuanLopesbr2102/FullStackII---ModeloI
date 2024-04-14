
import Candidato from "../Model/candidato.js";
import Vaga from "../Model/vaga.js";
import CandidatoVaga from "../Model/candidato_Vaga.js";
//import Departamento from "../Modelo/departamento.js";

export default class CandidatoVagasCtrl{
    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')){
            const dados = requisicao.body;
            //extraindo dados de um novo pedido
            const dataInscricao = new Date(dados.dataInscricao).toLocaleDateString();
            const HorasInscricao = dados.HorasInscricao;
            const cand_Codigo = dados.cand_Codigo;
            const vaga_Codigo  = dados.vagas;

            const objCandidato = new Candidato(cand_Codigo.codigo);

            let vagas = [];
            for (const vaga of vaga_Codigo){
                //instanciando um objeto do tipo Produto
                const vagascand = new Vaga(vaga.codigo);
                //instanciando um objeto do tipo ItemPedido
                
                vagas.push(vagascand);
            }
            //instanciando uma lista de objetos do tipo ItensPedido
            const candVaga = new CandidatoVaga(0,dataInscricao, HorasInscricao, objCandidato, vagas);
            //resolver a promise
            candVaga.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "codigo": candVaga.codigo,
                    "mensagem": "Incrição registrado com sucesso!"
                    
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
                const candVaga = new CandidatoVaga();
                candVaga.consultar(termo).then((listaCandVagas)=>{
                    resposta.status(200).json({
                        "status": true,
                        "lista Candidato e suas Vagas": listaCandVagas
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