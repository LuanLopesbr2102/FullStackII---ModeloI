import Vaga from "../Model/vaga.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class VagaDAO{
    async gravar(vaga){
        if (vaga instanceof Vaga){
            const sql = `INSERT INTO vaga(vaga_nome, vaga_salario, vaga_cidade,	vaga_quantidade	) VALUES(?,?,?,?)`; 
            const parametros = [vaga.nome, vaga.salario, vaga.cidade, vaga.quantidade];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            vaga.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    
    async atualizar(vaga){
        if (vaga instanceof Vaga){
            const sql = `UPDATE vaga SET vaga_nome = ?, vaga_salario = ?, vaga_cidade = ?,
            vaga_quantidade = ? WHERE vaga_codigo = ?`; 
            const parametros = [vaga.nome, vaga.salario, vaga.cidade, vaga.quantidade, vaga.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(vaga){
        if (vaga instanceof Vaga){
            const sql = "DELETE FROM vaga WHERE vaga_codigo = ?"; 
            const parametros = [vaga.codigo];
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
            sql='SELECT * FROM vaga WHERE vaga_codigo = ? order by vaga_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM vaga WHERE vaga_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaVaga = [];
        for (const registro of registros){
            const vaga = new Vaga(registro.vaga_codigo, registro.vaga_nome, registro.vaga_salario, registro.vaga_cidade, registro.vaga_quantidade);
            listaVaga.push(vaga);
        }
        return listaVaga;
    }
}