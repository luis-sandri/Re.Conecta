# ♻️ Re.Conecta

> **Conectando lixo eletrônico, aprendizado técnico e impacto social.**

## 🔐 Acesso de Teste (Visitante)

Para testar o sistema com permissões de apenas leitura, utilize:
- **Site:** https://reconecta-production.up.railway.app/login/login.html
- **Email:** visitante@reconecta.com
- **Senha:** senha123

<img width="1280" height="628" alt="image" src="https://github.com/user-attachments/assets/6483829a-7c5b-44d0-b328-8235da979583" />

## Arquitetura de banco de dados e requisitos

O projeto passou por etapas de **Discovery**, incluindo pesquisa com stakeholders e ideação, antes de chegar à implementação.

### Modelagem de Dados
A arquitetura do banco de dados foi desenhada para garantir a integridade das informações entre doadores, técnicos e ONGs.
#### Modelo conceitual
<img width="480" height="229" alt="image" src="https://github.com/user-attachments/assets/a4f2dcb5-01cf-464c-92cb-319170bd9057" />

#### Modelo lógico
<img width="480" height="480" alt="image" src="https://github.com/user-attachments/assets/399dee0a-d426-46a1-8b33-a7d0614466d5" />

#### Diagrama de caso de uso
<img width="466" height="480" alt="image" src="https://github.com/user-attachments/assets/5644cd95-3c39-4cf7-b17f-738a7317a911" />



---

## 📄 Sobre o Projeto

O **Re.Conecta** é uma plataforma idealizada para resolver dois problemas simultâneos: o descarte incorreto de resíduos eletrônicos (e-waste) e a falta de equipamentos para a prática de estudantes e técnicos iniciantes.

A proposta central é criar um ecossistema onde:
1.  **Pessoas** doam seus eletrônicos antigos/estragados.
2.  **Técnicos Voluntários** utilizam esses aparelhos para treinar habilidades de reparo (sem o medo de errar em um aparelho de cliente).
3.  **ONGs** recebem os equipamentos consertados e revitalizados.

### 🚧 Escopo Atual (MVP)

Este repositório contém o código fonte do **MVP (Produto Mínimo Viável)** focado na **Visão Administrativa (Back-office)**. Atualmente, o sistema permite que a equipe interna gerencie o fluxo de dados, doações e parceiros.

---

## 🎯 Funcionalidades

O foco atual é o controle de dados e gestão interna:

- [x] **Gestão de Doações:** Cadastro e rastreamento de equipamentos recebidos.
- [x] **Controle de Fluxo:** Atualização de status (Recebido -> Em Manutenção -> Disponível para Doação -> Entregue).
- [x] **Gestão de Entidades:** Cadastro de ONGs parceiras e Técnicos voluntários.
- [x] **Dashboard:** Visualização centralizada dos itens em estoque e status de reparo.

---

## 🛠 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

**Front-end:**
* [ HTML5, CSS3, JavaScript]
* [ Bootstrap]

**Back-end:**
* [ PHP ]

**Banco de Dados:**
* [ MySQL ]
* Modelagem focada em rastreabilidade e logística reversa.

---
