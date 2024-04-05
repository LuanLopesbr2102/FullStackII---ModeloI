export default class FuncionarioProjeto {
    
    #fincionario
    #dataAtribuicao
    #fp_descricao
    constructor(/*projeto,*/ fincionario, dataAtribuicao,fp_descricao) {
        //this.#projeto = projeto;
        this.#fincionario = fincionario;
        this.#dataAtribuicao = dataAtribuicao;
        this.#fp_descricao = fp_descricao ;
    }

    // Métodos de acesso (get) e modificação (set)
    
    /*get projeto() {
        return this.#projeto;
    }

    set projeto(novaProjeto) {
        this.#projeto = novaProjeto;
    }*/

    get fincionario() {
        return this.#fincionario;
    }

    set fincionario(novafincionario) {
        this.#fincionario = novafincionario;
    }
    
    get dataAtribuicao() {
        return this.#dataAtribuicao;
    }

    set dataAtribuicao(novodataAtribuicao) {
        this.#dataAtribuicao = novodataAtribuicao;
    }
    // Produto Nome
    
    get fp_descricao() {
        return this.#fp_descricao;
    }

    set fp_descricao(novofp_descricao) {
        this.#fp_descricao = novofp_descricao;
    }

    
    // JSON
    toJSON() {
        return {
           /* projeto:this.#projeto,*/
            fincionario:this.#fincionario,
            dataAtribuicao:this.#dataAtribuicao,
            fp_descricao:this.#fp_descricao
        };
    }
}
