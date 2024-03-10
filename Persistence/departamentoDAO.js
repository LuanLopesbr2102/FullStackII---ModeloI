import Departamento from '../model/departamento.js'
import Funcionarios from '../model/funcionario.js';
import conectar from './conexao.js';

export default class DepartamentoDAO {

    async gravar(departamento) {
        if (departamento instanceof Departamento) {
            const sql = `INSERT INTO Departamento(dep_Nome, dep_Localizacao,
                dep_Chefedodepartamento, dep_Dtacriacao, dep_Descricao, dep_Orcamento, fuc_cod)
                VALUES(?,?,?,?,?,?,?)`;
            const parametros = [departamento.Nome, departamento.Localizacao, departamento.ChefedeDepartamento,
                departamento.DatadeCriacao, departamento.Descricao, departamento.Orcamento, departamento.funcionario.id];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            departamento.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(departamento) {
        if (departamento instanceof Departamento) {
            const sql = `UPDATE Departamento SET dep_Nome = ?, dep_Localizacao = ?,
            dep_Chefedodepartamento = ?, dep_Dtacriacao = ?, dep_Descricao = ?, dep_Orcamento = ?, fuc_cod = ?
            WHERE dep_id = ?`;
            const parametros = [departamento.Nome, departamento.Localizacao, departamento.ChefedeDepartamento,
                departamento.DatadeCriacao, departamento.Descricao, departamento.Orcamento,departamento.funcionario.id, departamento.id];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(departamento) {
        if (departamento instanceof Departamento) {
            const sql = `DELETE FROM Departamento WHERE dep_id = ?`;
            const parametros = [departamento.id];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaDepartamentos = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do departamento
            // SELECT d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento, d.fuc_cod, f.fuc_id, f.fuc_Nome FROM Departamento d INNER JOIN Funcionarios f ON d.fuc_cod = f.fuc_id;
            const sql = `SELECT  d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, 
                d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento, f.fuc_id, f.fuc_Nome
                FROM Departamento d INNER JOIN Funcionarios f ON d.fuc_cod = f.fuc_id
                WHERE d.dep_id = ?
                ORDER BY d.dep_id               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const funcionarios = new Funcionarios(registro.fuc_id, registro.fuc_Nome)
                const departamento = new Departamento(registro.dep_id, registro.dep_Nome, registro.dep_Localizacao,
                                            registro.dep_Chefedodepartamento,registro.dep_Dtacriacao,
                                            registro.dep_Descricao, registro.dep_Orcamento, funcionarios
                                            );
                listaDepartamentos.push(departamento);
            }
        }
        else
        {
            //consulta pela nome dos depatamentos
            const sql = `SELECT d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, 
                d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento, f.fuc_id, f.fuc_Nome
                FROM Departamento d INNER JOIN Funcionarios f ON d.fuc_cod = f.fuc_id
                WHERE d.dep_Nome like ?
                ORDER BY d.dep_Nome               
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const funcionarios = new Funcionarios(registro.fuc_id, registro.fuc_Nome)
                const departamento = new Departamento(registro.dep_id, registro.dep_Nome, registro.dep_Localizacao,
                                            registro.dep_Chefedodepartamento,registro.dep_Dtacriacao,
                                            registro.dep_Descricao, registro.dep_Orcamento, funcionarios
                                            );
                listaDepartamentos.push(departamento);
            }
        }

        return listaDepartamentos;
    }
}