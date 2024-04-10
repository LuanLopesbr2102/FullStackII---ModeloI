import funcionarioDAO from "../Persistencia/funcionarioDAO.js";
//não esqueça do .js no final da importação

export default class Categoria {
    //definição dos atributos privados
        #id;
        #nome;
        #departamento

    constructor(id=0, nome='', departamento={}){
        this.#id=id;
        this.#nome=nome;
        this.#departamento = departamento;
    }

    //métodos de acesso públicos

    get id(){
        return this.#id;
    }

    set id(novoID){
        this.#id = novoID;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novaNome){
        this.#nome = novaNome;
    }

    get departamento(){
        return this.#departamento;
    }

    set departamento(novoDep){
        this.#departamento = novoDep
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            id:this.#id,
            nome:this.#nome,
            departamento:this.#departamento
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const funcDAO = new funcionarioDAO();
        await funcDAO.gravar(this);
     }
 
     async excluir(){
        const funcDAO = new funcionarioDAO();
        await funcDAO.excluir(this);
     }
 
     async atualizar(){
        const funcDAO = new funcionarioDAO();
        await funcDAO.atualizar(this);
     }
 
     async consultar(termo){
        const funcDAO = new funcionarioDAO();
        return await funcDAO.consultar(termo);
     }
}