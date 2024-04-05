import Projeto from "../Modelo/projeto.js";
import Funcionario from "../Modelo/funcionario.js";
import FuncionarioProjeto from "../Modelo/funcionarioProjeto.js";
import Departamento from "../Modelo/departamento.js";
import Cliente from "../Modelo/Cliente.js";
import conectar from "./conexao.js";

export default class ProjetoDAO{
    async gravar(projeto) {
        //um pedido no banco de dados grava registro na tabela pedido e também na tabela pedido_produto
        if (projeto instanceof Projeto) {
            const conexao = await conectar();
            //garantir a transação das operações para que seja realizada de forma atômica
            await conexao.beginTransaction();
            try {
                //inserir na tabela pedido
                const sql = 'INSERT INTO projeto(cliente_id,pro_nomeProjeto, pro_descricao, pro_dataInicio,pro_dataFinal,pro_orcamento) VALUES(?,?,?,str_to_date(?,"%d/%m/%Y"),str_to_date(?,"%d/%m/%Y"),?)';
                const parametros = [projeto.cliente.id,projeto.nomeProjeto, projeto.descricao ,projeto.dataInicio, projeto.dataFinal, projeto.orcamento];
                const retorno = await conexao.execute(sql, parametros);
                projeto.id = retorno[0].insertId;
                //inserir na tabela FuncionarioProjeto
                const sql2 = 'INSERT INTO FuncionarioProjeto(fp_projeto_id, fp_funcionario_id, fp_dataAtribuicao, fp_descricao) VALUES(?,?,str_to_date(?,"%d/%m/%Y"),?)';
                for (const func of projeto.funcs) {
                    let parametros2 = [projeto.id, func.fincionario.id, func.dataAtribuicao, func.fp_descricao];
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit(); //se chegou até aqui sem erros, confirmaremos as inclusões
            }
            catch (error) {
                await conexao.rollback(); //voltar o banco de dados ao estado anterior
                throw error; //throw = lançar
            }
        }

    }

    async alterar(pedido) {

    }

    async excluir(pedido) {

    }

    async consultar(termoBusca) {
        const listaProjeto = [];
        if (!isNaN(termoBusca)) { //assegurando que seja um código de pedido do tipo inteiro
            const conexao = await conectar();
            const sql = `SELECT p.pro_id, p.cliente_id, p.pro_nomeProjeto, p.pro_descricao,p.pro_dataInicio, p.pro_dataFinal, p.pro_orcamento,
                        c.id, c.cnpj, c.nome, c.telefone , c.email, c.endereco, c.bairro, c.cidade, c.uf, 
                        f.fuc_id, f.fuc_Nome, f.dep_cod,
                        d.dep_id,d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, d.
                        dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento,	 	
                        FP.fp_projeto_id,	FP.fp_funcionario_id,	FP.fp_dataAtribuicao,	FP.fp_descricao	
                        FROM projeto as p
                        INNER JOIN cliente as c ON p.cliente_id = c.id
                        INNER JOIN FuncionarioProjeto as FP ON FP.fp_projeto_id = p.pro_id
                        INNER JOIN Funcionarios as f ON FP.fp_funcionario_id = f.fuc_id
                        INNER JOIN Departamento as d ON f.dep_cod = d.dep_id
                        WHERE p.pro_id = ?`;
            const [registros, campos] = await conexao.execute(sql, [termoBusca]);
            if (registros.length > 0) {

                // a partir dos registros precisaremos restaurar os objetos
                
                //const projeto = new Projeto(registros[0].pro_id, registros[0].pro_nomeProjeto,registros[0].pro_descricao,registros[0].pro_dataInicio,registros[0].pro_dataFinal,registros[0].pro_orcamento);
                let listaFuncionarioProjeto = [];
                const cliente = new Cliente(registros[0].cliente_id, registros[0].cnpj, registros[0].nome, registros[0].telefone, registros[0].email, registros[0].endereco, registros[0].bairro, registros[0].cidade, registros[0].uf );
                for (const registro of registros) {
                    const departamento = new Departamento(registro.dep_id, registro.dep_Nome, registro.dep_Localizacao, registro.dep_Chefedodepartamento, registro.dep_Dtacriacao, registro.dep_Descricao,registro.dep_Orcamento);
                    const funcionario = new Funcionario(registro.fuc_id, registro.fuc_Nome,  departamento);
                    //const projeto = new Projeto(registro.pro_id, registro.pro_nomeProjeto,registro.pro_descricao,registro.pro_dataInicio,registro.pro_dataFinal,registro.pro_orcamento);
                    const funcionarioProjeto = new FuncionarioProjeto(funcionario, registro.fp_dataAtribuicao, registro.fp_descricao);
                    listaFuncionarioProjeto.push(funcionarioProjeto);

                }
                const projeto = new Projeto(registros[0].pro_id, cliente, registros[0].pro_nomeProjeto,registros[0].pro_descricao,registros[0].pro_dataInicio,registros[0].pro_dataFinal,registros[0].pro_orcamento, listaFuncionarioProjeto);
                
                listaProjeto.push(projeto);
            }

        }

        return listaProjeto;

    }


}