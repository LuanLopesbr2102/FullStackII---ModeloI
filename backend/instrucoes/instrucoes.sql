
CREATE TABLE candidato (
    cand_codigo INT AUTO_INCREMENT PRIMARY KEY,
    cand_cpf VARCHAR(16) NOT NULL,
    cand_nome VARCHAR(250) NOT NULL,
    cand_endereco VARCHAR(300) NOT NULL,
    cand_telefone VARCHAR(20) NOT NULL
);

CREATE TABLE Vaga (
    vaga_codigo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    vaga_nome VARCHAR (250) NOT NULL,
    vaga_salario INT NOT NULL,
    vaga_cidade VARCHAR(250) NOT NULL,
    vaga_quantidade INT NOT NULL
);

CREATE TABLE candidato_Vaga (
    cvcodigo INT AUTO_INCREMENT NOT NULL,
    data_inscricao DATE NOT NULL,
    horario_inscricao VARCHAR(30),
    pk_cand_codigo INT NOT NULL,
    pk_vaga_codigo INT NOT NULL,
    PRIMARY KEY (cvcodigo, pk_cand_codigo, pk_vaga_codigo),
    FOREIGN KEY (pk_cand_codigo) REFERENCES candidato(cand_codigo),
    FOREIGN KEY (pk_vaga_codigo) REFERENCES Vaga(vaga_codigo)
);
