-- Dados de exemplo para o banco ReconectaDB com bcrypt
-- Execute este arquivo DEPOIS de limpar os usuários antigos
-- Senha padrão para todos: "senha123"

USE railway;

-- Deletar usuários antigos (MENOS admin se quiser manter)
-- DELETE FROM usuario WHERE UPPER(role) != 'ADMIN';

-- ====== ADMIN ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Admin Sistema', 'admin@reconecta.com', '$2y$10$YourBcryptHashHere1234567890123456789012', '(11) 98765-4321', 'ADMIN');

SET @admin_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@admin_id, 'Rua das Flores, 123', 'Centro', 'Sala 10');


-- ====== DOADOR 1: Maria Silva ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Maria Silva', 'maria.silva@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(11) 98765-4321', 'DOADOR');

SET @doador1_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@doador1_id, 'Rua das Flores, 123', 'Jardim Primavera', 'Apto 45');

INSERT INTO perfis_doador (id, data_nasc, genero, tipo_documento, documento) VALUES
(@doador1_id, '1985-03-15', 'Feminino', 'CPF', '12345678901');


-- ====== DOADOR 2: João Santos ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('João Santos', 'joao.santos@hotmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(21) 99876-5432', 'DOADOR');

SET @doador2_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@doador2_id, 'Avenida Brasil, 456', 'Centro', 'Casa');

INSERT INTO perfis_doador (id, data_nasc, genero, tipo_documento, documento) VALUES
(@doador2_id, '1990-07-22', 'Masculino', 'CPF', '98765432109');


-- ====== DOADOR 3: Ana Costa ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Ana Costa', 'ana.costa@outlook.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(31) 97654-3210', 'DOADOR');

SET @doador3_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@doador3_id, 'Rua Minas Gerais, 789', 'Savassi', 'Bloco B');

INSERT INTO perfis_doador (id, data_nasc, genero, tipo_documento, documento) VALUES
(@doador3_id, '1978-11-10', 'Feminino', 'RG', '123456789');


-- ====== TÉCNICO 1: Carlos Oliveira ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Carlos Oliveira', 'carlos.oliveira@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(41) 98123-4567', 'TECNICO');

SET @tecnico1_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@tecnico1_id, 'Rua XV de Novembro, 321', 'Batel', 'Sala 12');

INSERT INTO perfis_tecnico (id, CPF, tipo_email, data_nasc, genero) VALUES
(@tecnico1_id, '11122233344', 'pessoal', '1987-06-05', 'Masculino');


-- ====== TÉCNICO 2: Fernanda Lima ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Fernanda Lima', 'fernanda.lima@usp.br', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(11) 91234-5678', 'TECNICO');

SET @tecnico2_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@tecnico2_id, 'Avenida Paulista, 1000', 'Bela Vista', 'Andar 5');

INSERT INTO perfis_tecnico (id, CPF, tipo_email, data_nasc, genero) VALUES
(@tecnico2_id, '55566677788', 'institucional', '1992-09-18', 'Feminino');


-- ====== ONG 1: Verde Futuro ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Verde Futuro', 'contato@verdefuturo.org.br', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(51) 3333-4444', 'ONG');

SET @ong1_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@ong1_id, 'Rua da Praia, 500', 'Centro Histórico', 'Sala 201');

INSERT INTO perfis_ong (id, CNPJ) VALUES
(@ong1_id, '12345678000190');


-- ====== ONG 2: Recicla Mais ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Recicla Mais', 'contato@reciclamais.org', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(85) 2222-3333', 'ONG');

SET @ong2_id = LAST_INSERT_ID();

INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES
(@ong2_id, 'Avenida Beira Mar, 250', 'Meireles', 'Térreo');

INSERT INTO perfis_ong (id, CNPJ) VALUES
(@ong2_id, '98765432000110');


-- ====== VISITANTE (Apenas visualização) ======
INSERT INTO usuario (nome, email, senha, telefone, role) VALUES
('Convidado Sistema', 'visitante@reconecta.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '(11) 0000-0000', 'VISITANTE');


-- ====== RESUMO ======
SELECT 'Dados inseridos com sucesso com bcrypt!' AS Status;
SELECT
    id,
    nome,
    email,
    role,
    'senha123' AS senha_padrao
FROM usuario
ORDER BY role, nome;
