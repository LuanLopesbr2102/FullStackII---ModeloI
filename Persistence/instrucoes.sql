CREATE table Departamento(
	dep_id INT NOT NULL AUTO_INCREMENT,
	dep_Nome VARCHAR (80) NULL,
	dep_Localizacao VARCHAR (100) NULL, 
	dep_Chefedodepartamento VARCHAR (80) NULL,
	dep_Dtacriacao DATE NULL,
	dep_Descricao VARCHAR (100) NULL,
	dep_Orcamento DECIMAL (10, 2) NULL,
	CONSTRAINT pk_Departamento
	    PRIMARY KEY (dep_id)
		
	    
);

CREATE table Funcionarios(
	fuc_id INT NOT NULL AUTO_INCREMENT,
	fuc_Nome VARCHAR (80) NULL,
    dep_cod INT NULL,
	CONSTRAINT pk_Funcionario
	    PRIMARY KEY (fuc_id),
    CONSTRAINT fk_Departamento_Func
	    FOREIGN KEY (dep_cod)
	    REFERENCES Departamento (dep_id)
);


CREATE TABLE Fornecedor(
    forne_id INT NOT NULL AUTO_INCREMENT,
    forne_nome VARCHAR (80) NULL,
    forne_endereco VARCHAR (90)NULL,
    forne_email VARCHAR (90)NULL,
    forne_telefone VARCHAR (20)NULL,
    CONSTRAINT pk_Fornecedor 
        PRIMARY KEY (forne_id)
);

CREATE TABLE Produto(
    pro_id int not null AUTO_INCREMENT,
    pro_nome VARCHAR (80) NULL,
    pro_descricao VARCHAR (100) NULL,
    pro_preco DECIMAL (10, 2) NULL,
    pro_quantEstoque INT NULL,
    fornecedor_cod INT NULL,
    CONSTRAINT pk_Produto 
        PRIMARY KEY (pro_id),
    CONSTRAINT fk_produto_forne
        FOREIGN KEY (fornecedor_cod)
	    REFERENCES Fornecedor (forne_id)	
);

CREATE TABLE produtoDepartamento(
    id_departamento INT NOT NULL,
    id_produto INT NOT NULL,
    quantProd INT NULL,
    descricao VARCHAR (500) NULL,
    precUnit DECIMAL NULL,
    CONSTRAINT pk_produtoFornecedor 
        PRIMARY KEY (id_departamento, id_produto),
    CONSTRAINT fk_departamento FOREIGN KEY (id_departamento) REFERENCES Departamento(dep_id),
    CONSTRAINT fk_produto FOREIGN KEY (id_produto) REFERENCES Produto(pro_id)
)