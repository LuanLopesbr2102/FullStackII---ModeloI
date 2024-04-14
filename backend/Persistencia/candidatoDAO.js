import Candidato from "../Model/candidato.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class CandidatoDAO{
    async gravar(candidato){
        if (candidato instanceof Candidato){
            const sql = `INSERT INTO candidato(cand_cpf, cand_nome, cand_endereco,
                cand_telefone) VALUES(?,?,?,?)`; 
            const parametros = [candidato.cpf, candidato.nome, candidato.endereco, candidato.telefone];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            candidato.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    
    async atualizar(candidato){
        if (candidato instanceof Candidato){
            const sql = `UPDATE candidato SET cand_cpf = ?, cand_nome = ?, cand_endereco = ?,
            cand_telefone = ? WHERE cand_codigo = ?`; 
            const parametros = [candidato.cpf, candidato.nome, candidato.endereco, candidato.telefone, candidato.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(candidato){
        if (candidato instanceof Candidato){
            const sql = "DELETE FROM candidato WHERE cand_codigo = ?"; 
            const parametros = [candidato.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da categoria
            sql='SELECT * FROM candidato WHERE cand_codigo = ? order by cand_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM candidato WHERE cand_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaCandidato = [];
        for (const registro of registros){
            const candidato = new Candidato(registro.cand_codigo, registro.cand_cpf, registro.cand_nome, registro.cand_endereco, registro.cand_telefone);
            listaCandidato.push(candidato);
        }
        return listaCandidato;
    }
}