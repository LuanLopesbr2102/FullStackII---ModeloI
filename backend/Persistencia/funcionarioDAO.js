import Departamento from '../Modelo/departamento.js';
import Funcionario from '../Modelo/funcionario.js';
import conectar from './conexao.js';

export default class FuncionarioDAO {

    async gravar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = `INSERT INTO Funcionarios(fuc_Nome, dep_cod)
                VALUES(?,?)`;
            const parametros = [funcionario.nome, funcionario.departamento.id];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            funcionario.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = `UPDATE Funcionarios SET fuc_Nome = ?, dep_cod = ?
            WHERE fuc_id = ?`;
            const parametros = [funcionario.nome, funcionario.departamento.id, funcionario.id];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = `DELETE FROM Funcionarios WHERE fuc_id = ?`;
            const parametros = [funcionario.id];
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
        let listafuncionarios = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do funcionario
            const sql = `SELECT f.fuc_id, f.fuc_Nome, f.dep_cod, d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, 
            d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento
            FROM Funcionarios f 
            INNER JOIN Departamento d ON f.dep_cod = d.dep_id
            WHERE f.fuc_id = ?
            ORDER BY f.fuc_Nome`;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const departamento = new Departamento(registro.dep_id,registro.dep_Nome, registro.dep_Localizacao, 
                    registro.dep_Chefedodepartamento, registro.dep_Dtacriacao, registro.dep_Descricao, 
                    registro.dep_Orcamento)
                const funcionario = new Funcionario(registro.fuc_id,registro.fuc_Nome, departamento);
                listafuncionarios.push(funcionario);
            }
        }
        else
        {
            //consulta pela descrição do funcionario
            const sql = `SELECT f.fuc_id, f.fuc_Nome, f.dep_cod, d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, 
            d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento
            FROM Funcionarios f INNER JOIN Departamento d ON f.dep_cod = d.dep_id
            WHERE f.fuc_Nome like ?
            ORDER BY f.fuc_Nome              
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const departamento = new Departamento(registro.dep_id,registro.dep_Nome, registro.dep_Localizacao, 
                    registro.dep_Chefedodepartamento, registro.dep_Dtacriacao, registro.dep_Descricao, 
                    registro.dep_Orcamento)
                const funcionario = new Funcionario(registro.fuc_id,registro.fuc_Nome, departamento);
                listafuncionarios.push(funcionario);
            }
        }

        return listafuncionarios;
    }
}