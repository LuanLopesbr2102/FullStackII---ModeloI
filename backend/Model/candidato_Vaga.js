import InscricoesDAO from "../Persistencia/candidato_VagaDAO.js";

//não esqueça do .js no final da importação

export default class Inscricao {
    
    #codigo;
    #dataInscricao;
    #HorasInscricao;
    #candidato;
    #vagas;
    
    

    constructor(codigo,dataInscricao, HorasInscricao, candidato, vagas){
        this.#codigo = codigo
        this.#dataInscricao=dataInscricao;
        this.#HorasInscricao = HorasInscricao;
        this.#candidato = candidato
        this.#vagas = vagas;
        
    }

    


    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCod){
        this.#codigo = novoCod;
    }

    get dataInscricao(){
        return this.#dataInscricao;
    }

    set dataInscricao(novodataInscricao){
        this.#dataInscricao = novodataInscricao;
    }

    get HorasInscricao() {
        return this.#HorasInscricao;
    }

    set HorasInscricao(novocHorasInscricao) {
        this.#HorasInscricao = novocHorasInscricao;
        
    }

    get candidato(){
        return this.#candidato;
    }

    set candidato(novoCandidato){
        this.#candidato = novoCandidato;
    }
   
    get vagas(){
        return this.#vagas;
    }

    set vagas(novoVagas){
        this.#vagas = novoVagas
    }

    
    //override do método toJSON
    toJSON()     
    {
        return {
            "codigo":this.#codigo,
            "dataInscricao":this.#dataInscricao,
            'HorasInscricao': this.#HorasInscricao,
            "candidato": this.#candidato,
            "vagas":this.#vagas
            
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const inscDAO = new InscricoesDAO();
        this.codigo = await inscDAO.gravar(this);
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
        const inscDAO = new InscricoesDAO();
        const listaCandVagas = await inscDAO.consultar(termoBusca);
        return listaCandVagas
     }
}