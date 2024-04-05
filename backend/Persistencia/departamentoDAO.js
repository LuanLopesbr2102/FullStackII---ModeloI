import Departamento from "../Modelo/departamento.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class DepartamentoDAO{
    async gravar(departamento){
        if (departamento instanceof Departamento){
            const sql = `INSERT INTO Departamento(dep_Nome, dep_Localizacao, dep_Chefedodepartamento, dep_Dtacriacao, dep_Descricao, dep_Orcamento) VALUES(?,?,?,?,?,?)`; 
            const parametros = [departamento.Nome, departamento.Localizacao, departamento.ChefedeDepartamento, departamento.DatadeCriacao, departamento.Descricao, departamento.Orcamento];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            departamento.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(departamento){
        if (departamento instanceof Departamento){
            const sql = `UPDATE Departamento SET dep_Nome = ?, dep_Localizacao = ?, dep_Chefedodepartamento = ?,
            dep_Dtacriacao = ?, dep_Descricao = ?, dep_Orcamento =? WHERE dep_id = ?`; 
            const parametros = [departamento.Nome, departamento.Localizacao, departamento.ChefedeDepartamento, departamento.DatadeCriacao, departamento.Descricao, departamento.Orcamento, departamento.id];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(departamento){
        if (departamento instanceof Departamento){
            const sql = "DELETE FROM Departamento WHERE dep_id = ?"; 
            const parametros = [departamento.id];
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
            sql='SELECT * FROM Departamento WHERE dep_id = ? order by dep_Nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM Departamento WHERE dep_Nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaDepartamentos = [];
        for (const registro of registros){
            const departamento = new Departamento(registro.dep_id, registro.dep_Nome, registro.dep_Localizacao, registro.dep_Chefedodepartamento, registro.dep_Dtacriacao, registro.dep_Descricao, registro.dep_Orcamento);
            listaDepartamentos.push(departamento);
        }
        return listaDepartamentos;
    }
}