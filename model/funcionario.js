import FuncionariosDAO from "../Persistence/funcionarioDAO.js";

export default class Funcionarios{
    #id;
    #Nome;
    #departamento;

    constructor(id=0, Nome='', departamento={}){
        this.#id=id;
        this.#Nome=Nome;
        this.#departamento=departamento;
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

    get departamento(){
        return this.#departamento;
    }

    set departamento(novoDepart){
        this.#departamento = novoDepart;
    }

    toJSON(){
        return {
            id:this.#id,
            Nome:this.#Nome,
            departamento:this.#departamento
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
 
     async atualizar(){
        const funcDAO = new FuncionariosDAO();
        await funcDAO.atualizar(this);
     }
 
     async consultar(termo){
        const funcDAO = new FuncionariosDAO();
        return await funcDAO.consultar(termo);
     }

}