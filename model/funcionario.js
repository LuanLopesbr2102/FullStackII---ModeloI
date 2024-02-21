import FuncionariosDAO from "../Persistence/funcionarioDAO.js";

export default class Funcionarios{
    #id;
    #Nome;
    

    constructor(id=0, Nome=""){
        this.#id=id;
        this.#Nome=Nome;
    }

    get id(){
        return this.#id;
    }
    set id(novoid){
        this.#id = novoid;
    }

    get Nome(){
        return this.#Nome;
    }

    set Nome(novaNome){
        this.#Nome=novaNome;
    }



    toJSON(){
        return {
            ID:this.#id,
            Nome:this.#Nome,
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const funcDAO = new FuncionariosDAO();
        await funcDAO.gravar(this);
     }
 
     async excluir(){
        const funcDAO = new FuncionariosDAO();
        await funcDAO.excluir(this);
     }
 
     async alterar(){
        const funcDAO = new FuncionariosDAO();
        await funcDAO.atualizar(this);
     }
 
     async consultar(termo){
        const funcDAO = new FuncionariosDAO();
        return await funcDAO.consultar(termo);
     }

}