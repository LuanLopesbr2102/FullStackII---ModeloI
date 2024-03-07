export default class ProdutoDepartamento {
    #departamento;
    #produto;
    #quatProd;
    #valTotal; 
    
    constructor(departamento, produto, quatProd,valTotal) {
        this.#departamento = departamento;
        this.#produto = produto;
        this.#quatProd = quatProd;
        this.#valTotal = valTotal;
    }

    // Métodos de acesso (get) e modificação (set)
    get departamento() {
        return this.#departamento;
    }

    set departamento(novoDepartamento) {
        this.#departamento = novoDepartamento;
    }

    get produto() {
        return this.#produto;
    }

    set produto(novaProduto) {
        this.#produto = novaProduto;
    }
    
    get quatProd() {
        return this.#quatProd;
    }

    set quatProd(novoQuatProd) {
        this.#quatProd = novoQuatProd;
    }
    // Produto Nome
    
    get valTotal() {
        return this.#valTotal;
    }

    set valTotal(novoValTotal) {
        this.#valTotal = novoValTotal;
    }

    
    // JSON
    /*#fornecedor;
    #produto;
    #quatProd;
    #valTotal; */ 
    toJSON() {
        return {
            'departamento': this.#departamento,
            'produto': this.#produto,
            'quatProd': this.#quatProd,
            'valTotal': this.#valTotal
        };
    }
}

