import Cliente from '../Modelo/Cliente.js';
import conectar from "./conexao.js";

export default class ClienteDAO{

    async incluir(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="INSERT INTO cliente(cnpj,nome,telefone,email,endereco,bairro,cidade, \
                                           uf) \
                                           VALUES(?,?,?,?,?,?,?,?)";
            const valores = [cliente.cnpj,cliente.nome, cliente.telefone, cliente.email, cliente.endereco, 
                             cliente.bairro, cliente.cidade, cliente.uf];                                        
            await conexao.query(sql,valores);
        }

    }

    async alterar(cliente){
        
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="UPDATE cliente SET nome=?, telefone = ?, email = ?, endereco = ?,bairro = ?, \
                                      cidade = ?, estado = ? \
                       WHERE cnpj=?";
            const valores = [cliente.nome, cliente.telefone, cliente.email, cliente.endereco, 
                             cliente.bairro, cliente.cidade, cliente.uf,
                              cliente.cnpj];                                        
            await conexao.query(sql,valores);
        }
    }

    async excluir(cliente){

        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql="DELETE FROM cliente WHERE cnpj=?";
            const valores = [cliente.cnpj];                                        
            await conexao.query(sql,valores);
        } 

    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM cliente WHERE nome LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaClientes = [];
        for(const row of rows){
            const cliente = new Cliente(row['id'],row['cnpj'],row['nome'], 
            row['telefone'], row['email'], row['endereco'],row['bairro'],row['cidade'],row['uf']);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }

    async consultarCNPJ(cnpj){
        const conexao = await conectar();
        const sql = "SELECT * FROM cliente WHERE cnpj = ?";
        const valores = [cnpj]
        const [rows] = await conexao.query(sql, valores);
        const listaClientes = [];
        for(const row of rows){
            const cliente = new Cliente(row['cnpj'],row['nome'],
            row['telefone'], row['email'],row['endereco'],row['bairro'],
            row['cidade'],row['uf']);
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}