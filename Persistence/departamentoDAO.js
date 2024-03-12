<<<<<<< HEAD:Persistencia/departamentoDAO.js
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
            departamento.codigo = retorno[0].insertId;
=======
import Departamento from "../model/departamento.js";
import conectar from "./conexao.js";

export default class DepartamentoDAO{
    async gravar(departamento){
        if (departamento instanceof Departamento){
            const sql = `INSERT INTO Departamento(dep_Nome, dep_Localizacao, dep_Chefedodepartamento, 
                dep_Dtacriacao,dep_Descricao, dep_Orcamento) VALUES(?,?,?,?,?,?)`; 
            const parametros = [departamento.Nome, departamento.Localizacao, departamento.ChefedeDepartamento, departamento.DatadeCriacao, departamento.Descricao, departamento.Orcamento];
            const conexao = await conectar(); 
            const retorno = await conexao.execute(sql,parametros); 
            departamento.id = retorno[0].insertId;
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/departamentoDAO.js
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(departamento){
        if (departamento instanceof Departamento){
<<<<<<< HEAD:Persistencia/departamentoDAO.js
            const sql = `UPDATE Departamento SET dep_Nome = ?, dep_Localizacao = ?, dep_Chefedodepartamento = ?,
            dep_Dtacriacao = ?, dep_Descricao = ?, dep_Orcamento =? WHERE dep_id = ?`; 
            const parametros = [departamento.Nome, departamento.Localizacao, departamento.ChefedeDepartamento, departamento.DatadeCriacao, departamento.Descricao, departamento.Orcamento, departamento.id];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
=======
            const sql = `UPDATE Departamento SET dep_Nome = ? dep_Localizacao = ? dep_Chefedodepartamento = ?
            dep_Dtacriacao = ? dep_Descricao = ? dep_Orcamento =? WHERE dep_id = ?`; 
            const parametros = [departamento.Nome, departamento.Localizacao, departamento.ChefedeDepartamento, departamento.DatadeCriacao, departamento.Descricao, departamento.Orcamento, departamento.id];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/departamentoDAO.js
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(departamento){
        if (departamento instanceof Departamento){
            const sql = "DELETE FROM Departamento WHERE dep_id = ?"; 
            const parametros = [departamento.id];
<<<<<<< HEAD:Persistencia/departamentoDAO.js
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
=======
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/departamentoDAO.js
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
<<<<<<< HEAD:Persistencia/departamentoDAO.js
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
=======
            // SELECT * FROM Departamento WHERE dep_id = ? order by dep_Nome;
            sql=`SELECT * FROM Departamento WHERE dep_id = ? order by dep_Nome`;
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela Nome do deprtamento
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = `SELECT * FROM Departamento WHERE dep_Nome like ?`;
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/departamentoDAO.js
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
<<<<<<< HEAD:Persistencia/departamentoDAO.js
        let listaDepartamentos = [];
        for (const registro of registros){
            const departamento = new Departamento(registro.dep_id, registro.dep_Nome, registro.dep_Localizacao, registro.dep_Chefedodepartamento, registro.dep_Dtacriacao, registro.dep_Descricao, registro.dep_Orcamento);
            listaDepartamentos.push(departamento);
        }
        return listaDepartamentos;
    }
}
=======
        let listaDepartamento = [];
        for (const registro of registros){
            const departamento = new Departamento(registro.dep_id, registro.dep_Nome, registro.Localizacao, registro.ChefedeDepartamento, registro.DatadeCriacao, registro.Descricao, registro.Orcamento)
            listaDepartamento.push(departamento);
        }
        return listaDepartamento;
    }
}


/*

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
}*/
>>>>>>> f544b11078ae957bff650b1da6264467db387f7a:Persistence/departamentoDAO.js
