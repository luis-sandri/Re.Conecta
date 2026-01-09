-- Criação do banco de dados
CREATE SCHEMA ReconectaDB;
USE ReconectaDB;

-- Criação das tabelas

CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(255),
    senha VARCHAR(255),
    telefone VARCHAR(18),
    role VARCHAR(7)
);

CREATE TABLE IF NOT EXISTS endereco (
    id INTEGER PRIMARY KEY,
    Rua VARCHAR(255),
    Bairro VARCHAR(255),
    Complemento VARCHAR(255),
    FOREIGN KEY (id) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS perfis_doador (
    id INTEGER PRIMARY KEY,
    data_nasc DATE,
    genero VARCHAR(9),
    tipo_documento VARCHAR(4),
    documento VARCHAR(14),
    FOREIGN KEY (id) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS perfis_tecnico (
    id INTEGER PRIMARY KEY,
    CPF VARCHAR(11),
    tipo_email VARCHAR(13),
    data_nasc DATE,
    genero VARCHAR(9),
    FOREIGN KEY (id) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS perfis_ong (
    id INTEGER PRIMARY KEY,
    CNPJ VARCHAR(14),
    FOREIGN KEY (id) REFERENCES usuario(id)
);
