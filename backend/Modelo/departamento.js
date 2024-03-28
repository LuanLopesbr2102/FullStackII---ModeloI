import departamentoDAO from "../Persistencia/departamentoDAO.js";

export default class Departamento{
    #id;
    #Nome;
    #Localizacao;
    #ChefedeDepartamento;
    #DatadeCriacao;
    #Descricao;
    #Orcamento



    constructor(id=0, Nome="", Localizacao="",ChefedeDepartamento='', DatadeCriacao="",Descricao="", Orcamento=""
                ){
        this.#id=id;
        this.#Nome=Nome;
        this.#Localizacao=Localizacao;
        this.#ChefedeDepartamento=ChefedeDepartamento;
        this.#DatadeCriacao=DatadeCriacao;
        this.#Descricao=Descricao;
        this.#Orcamento=Orcamento
    }

    get id(){
        return this.#id;
    }
    set id(novoid){
        this.#id = novoid;
    }

    get Descricao(){
        return this.#Descricao;
    }

    set Descricao(novaDesc){
        this.#Descricao=novaDesc;
    }

    get Nome(){
        return this.#Nome;
    }

    set Nome(novoNome){
        this.#Nome = novoNome
    }

    get Localizacao(){
        return this.#Localizacao;
    }
    
    set Localizacao(novoLocal){
        this.#Localizacao = novoLocal
    }

    get ChefedeDepartamento(){
        return this.#ChefedeDepartamento;
    }

    set ChefedeDepartamento(novaChefe){
        this.#ChefedeDepartamento = novaChefe;
    }

    get DatadeCriacao(){
        return this.#DatadeCriacao;
    }

    set DatadeCriacao(novaDta){
        this.#DatadeCriacao = novaDta;
    }

    get Orcamento(){
        return this.#Orcamento;
    }

    set Orcamento(novaOrc){
        this.#Orcamento = novaOrc;
    }


    toJSON(){
        return {
            id:this.#id,
            Nome:this.#Nome,
            Localizacao:this.#Localizacao,
            ChefedeDepartamento:this.#ChefedeDepartamento,
            DatadeCriacao:this.#DatadeCriacao,
            Descricao:this.#Descricao,
            Orcamento:this.#Orcamento,

        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const depDAO = new departamentoDAO();
        await depDAO.gravar(this);
    }

    async excluir(){
        const depDAO = new departamentoDAO();
        await depDAO.excluir(this);
    }

    async atualizar(){
        const depDAO = new departamentoDAO();
        await depDAO.atualizar(this);

    }

    async consultar(parametro){
        const depDAO = new departamentoDAO();
        return await depDAO.consultar(parametro);
    }

}