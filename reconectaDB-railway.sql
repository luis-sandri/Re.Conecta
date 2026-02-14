-- Criação do banco de dados para Railway
-- Adaptado para usar o schema 'railway' ao invés de 'ReconectaDB'

USE railway;

-- Remove tabelas existentes (na ordem correta por causa das foreign keys)
DROP TABLE IF EXISTS perfis_ong;
DROP TABLE IF EXISTS perfis_tecnico;
DROP TABLE IF EXISTS perfis_doador;
DROP TABLE IF EXISTS endereco;
DROP TABLE IF EXISTS usuario;

-- Criação das tabelas

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(255),
    senha VARCHAR(255),
    telefone VARCHAR(18),
    role VARCHAR(7)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE endereco (
    id INT PRIMARY KEY,
    Rua VARCHAR(255),
    Bairro VARCHAR(255),
    Complemento VARCHAR(255),
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE perfis_doador (
    id INT PRIMARY KEY,
    data_nasc DATE,
    genero VARCHAR(9),
    tipo_documento VARCHAR(4),
    documento VARCHAR(14),
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE perfis_tecnico (
    id INT PRIMARY KEY,
    CPF VARCHAR(11),
    tipo_email VARCHAR(13),
    data_nasc DATE,
    genero VARCHAR(9),
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE perfis_ong (
    id INT PRIMARY KEY,
    CNPJ VARCHAR(14),
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SELECT 'Tabelas criadas com sucesso no schema railway!' AS Status;
