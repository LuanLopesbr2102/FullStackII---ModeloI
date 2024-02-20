import DepartamentoDAO from "../Persistence/departamentoDAO";
//não esqueça do .js no final da importação

export default class Departamento {

    #id;
    #Nome;
    #Localizacao;
    #ChefedeDepartamento;
    #DatadeCriacao;
    #Descricao;
    #Orcamento
    #funcionario;

    constructor(id=0, Nome='', Localizacao='', ChefedeDepartamento='', DatadeCriacao='', Descricao='', Orcamento=0, funcionario={}){
        this.#id=id;
        this.#Nome=Nome;
        this.#Localizacao=Localizacao;
        this.#ChefedeDepartamento=ChefedeDepartamento;
        this.#DatadeCriacao=DatadeCriacao;
        this.#Descricao=Descricao;
        this.#Orcamento=Orcamento;
        this.#funcionario=funcionario;
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

    set Nome(novoNome){
        this.#id = novoNome;
    }
//id=0, Nome='', Localizacao='', ChefedeDepartamento='', DatadeCriacao='', Descricao='', Orcamento=''
    get Localizacao(){
        return this.#Localizacao;
    }

    set Localizacao(novoLocalizacao){
        this.#Localizacao = novoLocalizacao;
    }

    get ChefedeDepartamento(){
        return this.#ChefedeDepartamento;
    }

    set ChefedeDepartamento(novoChefedeDepartamento){
        this.#ChefedeDepartamento = novoChefedeDepartamento;
    }
    //id=0, Nome='', Localizacao='', ChefedeDepartamento='', DatadeCriacao='', Descricao='', Orcamento=''
    get DatadeCriacao(){
        return this.#DatadeCriacao;
    }

    set DatadeCriacao(novoDatadeCriacao){
        this.#DatadeCriacao = novoDatadeCriacao;
    }

    get Orcamento(){
        return this.#Orcamento;
    }

    set Orcamento(novoOrcamento){
        this.#Orcamento = novoOrcamento;
    }

    get Descricao(){
        return this.#Descricao;
    }

    set Descricao(novaDesc){
        this.#Descricao = novaDesc;
    }

    get funcionario(){
        return this.#funcionario;
    }

    set funcionario(novofunc){
        this.#funcionario = novofunc;
    }

    //override do método toJSON
    toJSON()     
    {//id=0, Nome='', Localizacao='', ChefedeDepartamento='', DatadeCriacao='', Descricao='', Orcamento=''
        return {
            id:this.#id,
            Nome:this.#Nome,
            Localização:this.#Localizacao,
            ChefedeDepartamento:this.#ChefedeDepartamento,
            DatadeCriacao:this.#DatadeCriacao,
            Descrição:this.#Descricao,
            Orcamento:this.#Orcamento,
            funcionario:this.#funcionario
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const depDAO = new DepartamentoDAO();
        await depDAO.gravar(this);
    }

    async excluir(){
        const depDAO = new DepartamentoDAO();
        await depDAO.excluir(this);
    }

    async atualizar(){
        const depDAO = new DepartamentoDAO();
        await depDAO.atualizar(this);

    }

    async consultar(parametro){
        const depDAO = new DepartamentoDAO();
        return await depDAO.consultar(parametro);
    }
}