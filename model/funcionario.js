import FuncionariosDAO from "../Persistence/departamentoDAO.js";

export default class Funcionarios{
    #id;
    #Nome;
    #Cargo;
    #Salario;
    #Dtadecontratacao;
    #Email;
    #DataNasc;


    constructor(id=0,Nome="", Cargo="", 
    Salario=0,Dtadecontratacao="", Email="", DataNasc=""
                ){
        this.#id=id;
        this.#Nome=Nome;
        this.#Cargo=Cargo;
        this.#Salario=Salario;
        this.#Dtadecontratacao=Dtadecontratacao;
        this.#Email=Email;
        this.#DataNasc=DataNasc
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

    set Cargo(novaCargo){
        this.#Cargo=novaCargo;
    }

    get Salario(){
        return this.#Salario;
    }

    set Salario(novoSalario){
        this.#Salario = novoSalario;
    }

    get Dtadecontratacao(){
        return this.#Dtadecontratacao;
    }
    
    set Dtadecontratacao(novoDT){
        this.#Dtadecontratacao = novoDT;
    }

    get Email(){
        return this.#Email;
    }

    set Email(novaEmail){
        this.#Email = novaEmail;
    }

    get DataNasc(){
        return this.#DataNasc;
    }

    set DataNasc(novaDataNasc){
        this.#DataNasc = novaDataNasc;
    }


    toJSON(){
        return {
            ID:this.#id,
            Nome:this.#Nome,
            Cargo:this.#Cargo,
            Salario:this.#Salario,
            Dtadecontratacao:this.#Dtadecontratacao,
            Email:this.#Email,
            DataNasc:this.#DataNasc
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