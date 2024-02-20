import Funcionario from "../model/funcionario.js";
import conectar from "./conexao.js";

export default class FuncionariosDAO{
    async gravar(funcionario){
        if (funcionario instanceof Funcionarios){
            const sql = "INSERT INTO Funcionarios(fuc_Nome,	fuc_Cargo, fuc_Salario, fuc_Dtadecontratacao, fuc_Email, fuc_DataNasc) VALUES(?,?,?,?,?,?)"; 
            const parametros = [funcionario.fuc_Nome, funcionario.fuc_Cargo, funcionario.fuc_Salario, funcionario.fuc_Dtadecontratacao, funcionario.fuc_Email, funcionario.fuc_DataNasc];
            const conexao = await conectar(); 
            const retorno = await conexao.execute(sql,parametros); 
            funcionario.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(funcionario){
        if (funcionario instanceof Funcionarios){
            const sql = "UPDATE Funcionarios SET dep_Nome = ?, dep_Cargo = ?, dep_Salario = ?, dep_Dtadecontratacao = ?, dep_Email = ?, dep_DataNasc = ? WHERE fuc_id = ?"; 
            const parametros = [funcionario.fuc_Nome, funcionario.fuc_Cargo, funcionario.fuc_Salario, funcionario.fuc_Dtadecontratacao, funcionario.fuc_Email, funcionario.fuc_DataNasc, funcionario.fuc_id];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(funcionario){
        if (funcionario instanceof Funcionarios){
            const sql = "DELETE FROM Funcionarios WHERE fuc_id = ?"; 
            const parametros = [funcionario.fuc_id];
            const conexao = await conectar(); 
            await conexao.execute(sql,parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            // SELECT d.dep_id, d.dep_Nome, d.dep_Localizacao, d.dep_Chefedodepartamento, d.dep_Dtacriacao, d.dep_Descricao, d.dep_Orcamento, d.fuc_cod, f.fuc_id, f.fuc_Nome FROM Departamento d INNER JOIN Funcionarios f ON d.fuc_cod = f.fuc_id;
            sql=`SELECT * FROM Funcionarios WHERE fuc_id ORDER BY fuc_id`;
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
            const funcionario = new Funcionario(registro.fuc_id, registro.fuc_Nome, registro.fuc_Cargo, registro.fuc_Salario, registro.fuc_dtadecontratacao, registro.fuc_Email, registro.fuc_DataNasc)
            listaFuncionario.push(funcionario);
        }
        return listaFuncionario;
    }
}