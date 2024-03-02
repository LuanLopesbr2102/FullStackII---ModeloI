import ClienteDAO from "../Persistencia/ClienteDAO.js";

export default class Fornecedor {
    #id;
    #nome;
    #endereco;
    #email;
    #telefone;

    constructor(id, nome, endereco, email) {
        this.#id = id;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#email = email;
        this.#telefone = telefone;
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

    // Nome
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        if (novoNome === "") {
            console.log("Dado não preenchido");
        } else {
            this.#nome = novoNome;
        }
    }

    /* #id;
    #nome;
    #endereco;
    #email;
    #telefone;*/
    
    // Endereço
    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        if (novoEndereco === "") {
            console.log("Dado não preenchido");
        } else {
            this.#endereco = novoEndereco;
        }
    }

    //nome
    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        if (novoEmail === "") {
            console.log("Dado não preenchido");
        } else {
            this.#email = novoEmail;
        }
    }

 //telefone
    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        if (novoTelefone === "" || novoTelefone.length !== 11) {
            console.log("Formato de telefone inválido");
        } else {
            this.#telefone = novoTelefone;
        }
    }

    // JSON
    /*#id;
    #nome;
    #endereco;
    #email;
    #telefone;*/ 
    toJSON() {
        return {
            'id': this.#id,
            'nome': this.#nome,
            'endereco': this.#endereco,
            'email': this.#email,
            'telefone': this.#telefone
        };
    }

    // essa parte não foi trocado  // vvvvvvv \\
    async gravar() {
        const clienteDAO = new ClienteDAO();
        this.codigo = await clienteDAO.adicionar(this);
    }

    async atualizar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.alterar(this);
    }

    async apagar() {
        const clienteDAO = new ClienteDAO();
        await clienteDAO.deletar(this);
    }

    async consultarPorNome(nome) {
        const clienteDAO = new ClienteDAO();
        const listaClientes = await clienteDAO.consultar(nome);
        return listaClientes;
    }

    async consultarPorTelefone(telefone) {
        const clienteDAO = new ClienteDAO();
        const listaClientes = await clienteDAO.consultarTelefone(telefone);
        return listaClientes;
    }
}