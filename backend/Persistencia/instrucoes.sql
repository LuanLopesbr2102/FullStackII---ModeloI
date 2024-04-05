CREATE DATABASE sistema;

USE sistema;

CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cnpj VARCHAR(20) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR (255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    bairro VARCHAR(250)NOT NULL,
    cidade VARCHAR(250)NOT NULL,
    uf VARCHAR(250)NOT NULL

);

CREATE TABLE projeto (
    pro_id INT AUTO_INCREMENT,
    cliente_id INT,
    pro_nomeProjeto VARCHAR(255) NOT NULL,
    pro_descricao VARCHAR(500) NOT NULL,
    pro_dataInicio DATE,
    pro_dataFinal DATE,
    pro_orcamento DECIMAL(10, 2),
    PRIMARY KEY (pro_id),
    CONSTRAINT FK_CLIENTE FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

CREATE TABLE FuncionarioProjeto (
    fp_projeto_id INT NOT NULL,
    fp_funcionario_id INT NOT NULL,
    fp_dataAtribuicao DATE,
    fp_descricao VARCHAR(500) NOT NULL,
    PRIMARY KEY (fp_projeto_id, fp_funcionario_id), -- Chave primária composta
    FOREIGN KEY (fp_projeto_id) REFERENCES projeto(pro_id),
    FOREIGN KEY (fp_funcionario_id) REFERENCES Funcionarios(fuc_id)
);

CREATE TABLE FuncionarioProjeto (
    fp_projeto_id INT NOT NULL,
    fp_funcionario_id INT NOT NULL,
    fp_dataAtribuicao DATE,
    fp_descricao VARCHAR(500) NOT NULL,
    PRIMARY KEY (fp_projeto_id, fp_funcionario_id), -- Chave primária composta
    
);