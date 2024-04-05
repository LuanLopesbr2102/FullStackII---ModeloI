import ProjetoDAO from "../Persistencia/projetoDAO.js";
//não esqueça do .js no final da importação

export default class Projeto {
    //definição dos atributos privados
    #id;
    #cliente
    #nomeProjeto;
    #descricao
    #dataInicio;
    #dataFinal;
    #orcamento;
    #funcs;
    

    constructor(id, cliente, nomeProjeto,descricao,dataInicio, dataFinal, orcamento, funcs){
        this.#id=id;
        this.#cliente = cliente;
        this.#nomeProjeto=nomeProjeto;
        this.#descricao = descricao;
        this.#dataInicio = dataInicio;
        this.#dataFinal = dataFinal;
        this.#descricao = descricao;
        this.#orcamento = orcamento;
        this.#funcs = funcs;
    }

    //métodos de acesso públicos

    get id(){
        return this.#id;
    }

    set id(novoID){
        this.#id = novoID;
    }

    get cliente() {
        return this.#cliente;
    }

    set cliente(novocliente) {
        this.#cliente = novocliente;
        
    }

    get nomeProjeto(){
        return this.#nomeProjeto;
    }

    set nomeProjeto(novonomeProjeto){
        this.#nomeProjeto = novonomeProjeto;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novoDescricao){
        this.#descricao = novoDescricao
    }

    get dataInicio(){
        return this.#dataInicio;
    }

    set dataInicio(novoDataInicio){
        this.#dataInicio = novoDataInicio
    }

    get dataFinal(){
        return this.#dataFinal;
    }

    set dataFinal(novoDataFinal){
        this.#dataFinal = novoDataFinal
    }

    get orcamento(){
        return this.#orcamento;
    }

    set orcamento(novoOrcamento){
        this.#orcamento = novoOrcamento
    }

    get funcs(){
        return this.#funcs;
    }

    set funcs(novofuncProjote){
        this.#funcs = novofuncProjote
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            "id":this.#id,
            'cliente': this.#cliente,
            "nomeProjeto":this.#nomeProjeto,
            "descricao":this.#descricao,
            "dataInicio":this.#dataInicio,
            "dataFinal":this.#dataFinal,
            "descricao":this.#descricao,
            "orcamento":this.#orcamento,
            "funcs":this.#funcs
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const projDAO = new ProjetoDAO();
        this.id = await projDAO.gravar(this);
     }
 
    /* async excluir(){
        const projDAO = new ProjetoDAO();
        await projDAO.excluir(this);
     }
 
     async atualizar(){
        const projDAO = new ProjetoDAO();
        await projDAO.atualizar(this);
     }*/
 
     async consultar(termoBusca){
        const projDAO = new ProjetoDAO();
        const listaProjeto = await projDAO.consultar(termoBusca);
        return listaProjeto
     }
}