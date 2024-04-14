import CandidatoDAO from '../Persistencia/candidatoDAO.js';

export default class Candidato{
    #codigo
    #cpf;  //# define que um atributo seja privado
    #nome;
    #endereco;
    #telefone;
    

    //método construtor que define as informações necessárias para se criar um cliente
    constructor(codigo=0, cpf, nome, endereco,telefone){
        this.#codigo = codigo;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#telefone = telefone;
    
        
        //c.id, c.cnpj, c.nome, c.bairro, c.cidade, c.uf, c.telefone, c.endereco, c.email,
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novocodigo){
        this.#codigo = novocodigo;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCPF){
        this.#cpf = novoCPF;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if(novoNome != "") //regra de negócio que impede que clientes existam com nomes vazios
            this.#nome = novoNome;
    }

    
    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEnd){
        this.#endereco = novoEnd;
    }


    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTel){
        this.#telefone = novoTel;
    }

    


    

    

    

   
    
    //override ou sobrescrita do método toJSON
    toJSON(){
        return {
            "codigo"   : this.#codigo,
            "cpf"      : this.#cpf,
            "nome"     : this.#nome,
            "endereco" : this.#endereco,
            "telefone" : this.#telefone
            
            
            
        }
    }

    async gravar(){
        const candDAO = new CandidatoDAO();
        await candDAO.gravar(this);
     }
 
     async excluir(){
        const candDAO = new CandidatoDAO();
        await candDAO.excluir(this);
     }
 
     async atualizar(){
        const candDAO = new CandidatoDAO();
        await candDAO.atualizar(this);
     }
 
     async consultar(termo){
        const candDAO = new CandidatoDAO();
        return await candDAO.consultar(termo);
     }
}