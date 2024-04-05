import ClienteDAO from '../Persistencia/ClienteDAO.js';

export default class Cliente{

    #id;
    #cnpj;  //# define que um atributo seja privado
    #nome;
    #telefone;
    #email;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    

    //método construtor que define as informações necessárias para se criar um cliente
    constructor(id, cnpj, nome, telefone, email, endereco, bairro, cidade, uf){
        this.#id= id;
        this.#cnpj = cnpj;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        
        //c.id, c.cnpj, c.nome, c.bairro, c.cidade, c.uf, c.telefone, c.endereco, c.email,
    }

    get id(){
        return this.#id;
    }

    set id(novoID){
        this.id = novoID;
    }

    get cnpj(){
        return this.#cnpj;
    }

    set cnpj(novoCnpj){
        this.#cnpj = novoCnpj;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if(novoNome != "") //regra de negócio que impede que clientes existam com nomes vazios
            this.#nome = novoNome;
    }
    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTel){
        this.#telefone = novoTel;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEnd){
        this.#endereco = novoEnd;
    }

    get bairro(){
        return this.#bairro;    
    }
    
    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get uf(){
        return this.#uf;
    }
    
    set uf(novaUf){
        this.#uf=novaUf;
    }

   
    
    //override ou sobrescrita do método toJSON
    toJSON(){
        return {
            "id"   : this.#id,
            "cnpj"      : this.#cnpj,
            "nome"     : this.#nome,
            "telefone" : this.#telefone,
            "email"    : this.#email,
            "endereco" : this.#endereco,
            "bairro"   : this.#bairro,
            "cidade"   : this.#cidade,
            "uf"       : this.#uf
        }
    }

    async gravar(){
        const clienteDAO = new ClienteDAO();
        await clienteDAO.incluir(this);
    }

    async atualizar() {
        const clienteBD = new ClienteDAO();
        await clienteBD.alterar(this);
    }

    async excluir() {
        const clienteBD = new ClienteDAO();
        await clienteBD.excluir(this);
    }

    async consultar(termo){
        const clienteBD = new ClienteDAO();
        const clientes = await clienteBD.consultar(termo);
        return clientes;
    }

    async consultarCNPJ(cnpj){
        const clienteBD = new ClienteDAO();
        const clientes = await clienteBD.consultarCNPJ(cnpj);
        return clientes;
    }
}