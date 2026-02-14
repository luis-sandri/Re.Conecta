-- Dados de exemplo para o banco ReconectaDB
-- Execute este arquivo DEPOIS de importar o reconectaDB-railway.sql

USE railway;

-- Senha padrão para todos: "senha123"

-- ====== ADMIN ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Admin Sistema', 'admin@reconecta.com', MD5('senha123'), '(11) 98765-4321', 'admin');

SET @admin_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@admin_id, 'Rua das Flores, 123', 'Centro', 'Sala 10');


-- ====== DOADOR 1: Maria Silva ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Maria Silva', 'maria.silva@email.com', MD5('senha123'), '(11) 91234-5678', 'doador');

SET @doador1_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@doador1_id, 'Av. Paulista, 1000', 'Bela Vista', 'Apto 501');

INSERT INTO perfis_doador (id, data_nasc, genero, tipo_documento, documento) VALUES
(@doador1_id, '1985-03-15', 'Feminino', 'CPF', '12345678901');


-- ====== DOADOR 2: João Santos ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('João Santos', 'joao.santos@email.com', MD5('senha123'), '(11) 92345-6789', 'doador');

SET @doador2_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@doador2_id, 'Rua Augusta, 500', 'Consolação', 'Casa');

INSERT INTO perfis_doador (id, data_nasc, genero, tipo_documento, documento) VALUES
(@doador2_id, '1990-07-20', 'Masculino', 'CPF', '23456789012');


-- ====== DOADOR 3: Ana Costa ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Ana Costa', 'ana.costa@email.com', MD5('senha123'), '(11) 93456-7890', 'doador');

SET @doador3_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@doador3_id, 'Rua Oscar Freire, 200', 'Jardins', 'Apto 102');

INSERT INTO perfis_doador (id, data_nasc, genero, tipo_documento, documento) VALUES
(@doador3_id, '1988-11-10', 'Feminino', 'CPF', '34567890123');


-- ====== TÉCNICO 1: Carlos Oliveira ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Carlos Oliveira', 'carlos.oliveira@email.com', MD5('senha123'), '(11) 94567-8901', 'tecnico');

SET @tecnico1_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@tecnico1_id, 'Rua da Consolação, 300', 'Consolação', 'Apto 25');

INSERT INTO perfis_tecnico (id, CPF, tipo_email, data_nasc, genero) VALUES
(@tecnico1_id, '45678901234', 'Pessoal', '1992-05-12', 'Masculino');


-- ====== TÉCNICO 2: Pedro Almeida ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Pedro Almeida', 'pedro.almeida@email.com', MD5('senha123'), '(11) 95678-9012', 'tecnico');

SET @tecnico2_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@tecnico2_id, 'Av. Brigadeiro Faria Lima, 1500', 'Pinheiros', 'Conj 12');

INSERT INTO perfis_tecnico (id, CPF, tipo_email, data_nasc, genero) VALUES
(@tecnico2_id, '56789012345', 'Profissional', '1995-08-25', 'Masculino');


-- ====== ONG 1: Recicla Mais ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('ONG Recicla Mais', 'contato@reciclamais.org', MD5('senha123'), '(11) 3000-1000', 'ong');

SET @ong1_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@ong1_id, 'Rua dos Bandeirantes, 800', 'Vila Mariana', 'Galpão 3');

INSERT INTO perfis_ong (id, CNPJ) VALUES
(@ong1_id, '12345678000190');


-- ====== ONG 2: Instituto Verde ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Instituto Verde', 'atendimento@institutoverde.org', MD5('senha123'), '(11) 3000-2000', 'ong');

SET @ong2_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@ong2_id, 'Av. Ibirapuera, 2000', 'Moema', 'Sala 15');

INSERT INTO perfis_ong (id, CNPJ) VALUES
(@ong2_id, '23456789000191');


-- ====== VISITANTE (Apenas visualização) ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Visitante Demo', 'visitante@reconecta.com', MD5('senha123'), '(11) 99999-9999', 'viewer');

SET @viewer_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@viewer_id, 'N/A', 'N/A', 'Conta de visualização');


-- ====== RESUMO ======
SELECT 'Dados inseridos com sucesso!' AS Status;
SELECT
    id,
    nome,
    email,
    role,
    'senha123' AS senha_padrao
FROM usuario
ORDER BY role, nome;
