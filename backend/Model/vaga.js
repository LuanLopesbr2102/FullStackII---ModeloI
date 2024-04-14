import VagaDAO from "../Persistencia/vagaDAO.js";

export default class Vaga{
    #codigo;
    #nome
    #salario;
    #cidade;
    #quantidade;
    

    constructor(codigo, nome, salario, cidade, quantidade){
        this.#codigo=codigo;
        this.#nome = nome;
        this.#salario=salario;
        this.#cidade=cidade;
        this.#quantidade=quantidade
        
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get salario(){
        return this.#salario;
    }

    set salario(novaSalario){
        this.#salario=novaSalario;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novoCidade){
        this.#cidade = novoCidade
    }

    get quantidade(){
        return this.#quantidade;
    }
    
    set quantidade(novoQuantidade){
        this.#quantidade = novoQuantidade
    }

    


    toJSON(){
        return {
            codigo:this.#codigo,
            nome:this.#nome,
            salario:this.#salario,
            cidade:this.#cidade,
            quantidade:this.#quantidade
            

        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const vagaDAO = new VagaDAO();
        await vagaDAO.gravar(this);
    }

    async excluir(){
        const vagaDAO = new VagaDAO();
        await vagaDAO.excluir(this);
    }

    async atualizar(){
        const vagaDAO = new VagaDAO();
        await vagaDAO.atualizar(this);

    }

    async consultar(parametro){
        const vagaDAO = new VagaDAO();
        return await vagaDAO.consultar(parametro);
    }

}