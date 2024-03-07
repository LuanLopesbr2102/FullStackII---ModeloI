import ProdutoDAO from "../Persistence/produtoDAO.js";
export default class Produto {
    #id;
    #nome;
    #descricao;
    #preco;
    #quantidadeEstoque;
    #fornecedor
    #departamento

    constructor(id, nome, descricao,  preco, quantidadeEstoque, fornecedor, departamento) {
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#preco = preco;
        this.#quantidadeEstoque = quantidadeEstoque;
        this.#fornecedor = fornecedor;
        this.#departamento = departamento;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get id() {
        return this.#id;
    }

    set id(novoID) {
        if (novoID === "" || typeof novoID !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#id = novoID;
        }
    }

    // Código do Cliente
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
        
    }

    // Data
    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    // Total do Pedido
    get preco() {
        return this.#preco;
    }

    set preco(novoPreco) {
        this.#preco = novoPreco;
    }

    // Produtos
    get quantidadeEstoque() {
        return this.#quantidadeEstoque;
    }

    set quantidadeEstoque(novosquantidadeEstoque) {
        this.#quantidadeEstoque = novosquantidadeEstoque;
    }

    get fornecedor() {
        return this.#fornecedor;
    }

    set fornecedor(novosFornecedor) {
        this.#fornecedor = novosFornecedor;
    }

    get departamento() {
        return this.#departamento;
    }

    set departamento(novosDepartamento) {
        this.#departamento = novosDepartamento;
    }
    /* #id;
    #nome;
    #descricao;
    #preco;
    #quantidadeEstoque;
    #fornecedor
    #departamento*/

    toJSON() {
        return {
            'id': this.#id,
            'nome': this.#nome,
            'descricao': this.#descricao,
            'preco': this.#preco,
            'quantidadeEstoque': this.#quantidadeEstoque, 
            'fornecedor': this.#fornecedor,
            'departamento': this.#departamento

        };
    }
// essa parte não foi trocado  // vvvvvvv \\

    async gravar() {
        const prodDAO = new ProdutoDAO();
        this.codigo = await prodDAO.gravar(this);
    }

    async atualizar() {
        const prodDAO = new ProdutoDAO();
        await prodDAO.atualizar(this); //alterar
    }

    async excluir() {
        const prodDAO = new ProdutoDAO();
        await prodDAO.excluir(this);
    }

    async consultar(termoBusca) {
        const prodDAO = new ProdutoDAO();
        const listaPedidos = await prodDAO.consultar(termoBusca);
        return listaPedidos;
    }
    
}