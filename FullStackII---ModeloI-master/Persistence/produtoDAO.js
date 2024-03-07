import Produto from "../model/produto.js";
import Fornecedor from "../model/fornecedor.js";
import Departamento from "../model/departamento.js";
import Funcionario from "../model/funcionario.js";
import ProdutoFornecedor from "../model/produtoDepartamento.js";

import conectar from "./conexao";

export default class ProdutoDAO{
    async gravar (produto){
        if( produto instanceof Produto)
        {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try
            {   /* #id;
            #nome;
            #descricao;
            #preco;
            #quantidadeEstoque;
            #fornecedor*/
                const sql = `INSERT INTO Produto(pro_nome, pro_descricao, pro_preco, pro_quantEstoque, fornecedor_cod) VALUES (?,?,?,?,?,?)`
                const   parametros=[produto.nome, produto.descricao, produto.preco, produto.quantidadeEstoque, produto.fornecedor.id]
                const retorno = await conexao.execute(sql,parametros);
                produto.id = retorno[0].insertId;
                const sql2 = 'INSERT INTO produtoDepartamento(id_departamento, id_produto, quantProd, descricao, precUnit) VALUES (?,?,?,?,?)'
                for (const departamentos of produto.departamento){
                    let parametros2 = [departamentos.departamento.id, produto.id, produto.quantidadeEstoque, produto.descricao, produto.preco]
                    await conexao.execute(sql2,parametros2);
                }
                await conexao.commit();
            }
            catch(error){
                await conexao.rollback();
            }
            


        }
    }

    async alterar (produto){
        
    }

    async excluir (produto){
        
    }

    async consultar (termoBusca){
        const listaProdutos = [];
        if (!isNaN(termoBusca)){
            const conexao = await conectar();
            const sql = `SELECT p.pro_id, p.pro_nome, p.pro_descricao, p.pro_quantEstoque, p.pro_preco, p.pro_quantEstoque * p.pro_preco as subtotal, p.fornecedor_cod, f.forne_nome, f.forne_endereco, f.forne_email, f.forne_telefone, pd.quantProd, pd.descricao, pd.precUnit, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento, fu.fuc_Nome
                        FROM Produto as p 
                        INNER JOIN Fornecedor as f ON p.fornecedor_cod = f.forne_id 
                        INNER JOIN produtoDepartamento as pd ON pd.id_produto = p.pro_id
                        INNER JOIN Departamento as d ON pd.id_departamento = d.dep_id
                        INNER JOIN Funcionarios as fu ON d.fuc_cod = fu.fuc_id
                        WHERE p.pro_id = 1;`; 
            const [registros, campos] = await global.conexao.execute(sql,[termoBusca]);
            let listaProdutoFornecedor = [];
            for (const registro of registros){
                /**/
                                
            const funcionario = new Funcionario(registro.Nome);
            const departamento = new Departamento(registro.Nome, registro.Localizacao, registro.ChefedeDepartamento, registro.DatadeCriacao, registro.Descricao, registro.Orcamento, funcionario);
            const fornecedor = new Fornecedor(registro.nome, registro.endereco, registro.email, registro.telefone);
            const produto = new Produto(registro.id, registro.nome, registro.descricao, registro.quantidadeEstoque,registro.preco, registro.subtotal, fornecedor, departamento);
            const produtoFornecedor = new ProdutoFornecedor(departamento, produto, registro.quatProd, registro.valTotal)
            listaProdutoFornecedor.push(produtoFornecedor)
                                    
                
            }
                                    const funcionario = new Funcionario(registros.Nome);
                                    const departamento = new Departamento(registros.Nome, registros.Localizacao, registros.ChefedeDepartamento, registros.DatadeCriacao, registros.Descricao, registros.Orcamento, funcionario);
                                    const produto = new Produto(registros.id, registros.nome, registros.descricao, registros.quantidadeEstoque,registros.preco, registros.subtotal, departamento);
                                    listaProdutos.push(produto)
        }                           

        return listaProdutos;
        
    }

    
}