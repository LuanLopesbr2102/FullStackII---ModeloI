<<<<<<< HEAD:Persistencia/funcionarioDAO.js
import Departamento from '../Modelo/departamento.js';
import Funcionario from '../Modelo/funcionario.js';
import conectar from './conexao.js';

export default class FuncionarioDAO {

    async gravar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = `INSERT INTO Funcionarios(fuc_Nome, dep_cod)
                VALUES(?,?)`;
            const parametros = [funcionario.nome, funcionario.departamento.id];

=======
import Departamento from '../model/departamento.js'
import Funcionarios from '../model/funcionario.js';
import conectar from './conexao.js';

export default class FuncionariosDAO {

    async gravar(funcionario) {
        if (funcionario instanceof Funcionarios) {
            const sql = `INSERT INTO Funcionarios(fuc_Nome, dep_cod)
                VALUES(?,?)`;
            const parametros = [funcionario.Nome, funcionario.departamento.id];
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/funcionarioDAO.js
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            funcionario.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(funcionario) {
<<<<<<< HEAD:Persistencia/funcionarioDAO.js
        if (funcionario instanceof Funcionario) {
            const sql = `UPDATE Funcionarios SET fuc_Nome = ?, dep_cod = ?
            WHERE fuc_id = ?`;
            const parametros = [funcionario.nome, funcionario.departamento.id, funcionario.id];
=======
        if (funcionario instanceof Funcionarios) {
            const sql = `UPDATE Funcionarios SET fuc_Nome = ?, dep_cod = ?,WHERE fuc_id = ?`;
            const parametros = [funcionario.Nome, funcionario.departamento.id, funcionario.id];
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/funcionarioDAO.js

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(funcionario) {
<<<<<<< HEAD:Persistencia/funcionarioDAO.js
        if (funcionario instanceof Funcionario) {
=======
        if (funcionario instanceof Funcionarios) {
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/funcionarioDAO.js
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
<<<<<<< HEAD:Persistencia/funcionarioDAO.js
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
=======
        let listaFuncionarios = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do departamento
            // SELECT d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento, d.fuc_cod, f.fuc_id, f.fuc_Nome FROM Departamento d INNER JOIN Funcionarios f ON d.fuc_cod = f.fuc_id;
            const sql = `SELECT f.fuc_id, f.fuc_Nome, d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, 
                        d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento
                        FROM Funcionarios f INNER JOIN Departamento d ON f.dep_cod = f.fuc_id
                        WHERE f.fuc_Nome like ?
                        ORDER BY f.fuc_Nome                
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const departamento = new Departamento(registro.dep_id, registro.dep_Nome, registro.dep_Localizacao,
                    registro.dep_Chefedodepartamento,registro.dep_Dtacriacao,
                    registro.dep_Descricao, registro.dep_Orcamento);
                const funcionarios = new Funcionarios(registro.fuc_id, registro.fuc_Nome, departamento)
                listaFuncionarios.push(funcionarios);
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/funcionarioDAO.js
            }
        }
        else
        {
<<<<<<< HEAD:Persistencia/funcionarioDAO.js
            //consulta pela descrição do funcionario
            const sql = `SELECT f.fuc_id, f.fuc_Nome, f.dep_cod, d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, 
            d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento
            FROM Funcionarios f INNER JOIN Departamento d ON f.dep_cod = d.dep_id
            WHERE f.fuc_Nome like ?
            ORDER BY f.fuc_Nome              
=======
            //consulta pela nome dos depatamentos
            const sql = `SELECT f.fuc_id, f.fuc_Nome, d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, 
                d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento
                FROM Funcionarios f INNER JOIN Departamento d ON f.dep_cod = f.fuc_id
                WHERE f.fuc_Nome like ?
                ORDER BY f.fuc_Nome               
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/funcionarioDAO.js
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
<<<<<<< HEAD:Persistencia/funcionarioDAO.js
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
=======
                const departamento = new Departamento(registro.dep_id, registro.dep_Nome, registro.dep_Localizacao,
                    registro.dep_Chefedodepartamento,registro.dep_Dtacriacao,
                    registro.dep_Descricao, registro.dep_Orcamento
                    );
                const funcionarios = new Funcionarios(registro.fuc_id, registro.fuc_Nome, departamento);
                
                listaFuncionarios.push(funcionarios);
            }
        }

        return listaFuncionarios;
    }
}






/*
async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            // SELECT * FROM Funcionarios WHERE fuc_id = ? order by fuc_Nome;
            sql=`SELECT * FROM Funcionarios WHERE fuc_id = ? order by fuc_Nome`;
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela Nome do deprtamento
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = `SELECT * FROM Funcionarios WHERE fuc_Nome like ?`;
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaFuncionario = [];
        for (const registro of registros){
            const funcionario = new Funcionario(registro.fuc_id, registro.fuc_Nome)
            listaFuncionario.push(funcionario);
        }
        return listaFuncionario;
    }
}*/
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/funcionarioDAO.js
