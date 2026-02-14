# 🚂 Guia de Deploy no Railway

Este guia explica como fazer deploy do **Re.Conecta** no Railway.

## 📋 Pré-requisitos

1. Conta no [Railway](https://railway.app)
2. Projeto Re.Conecta no GitHub
3. Banco de dados MySQL configurado

## 🗄️ Passo 1: Configurar Banco de Dados MySQL

### Opção A: Usar MySQL do Railway

1. Acesse o [Railway Dashboard](https://railway.app/dashboard)
2. Clique em **"+ New Project"**
3. Selecione **"Deploy MySQL"**
4. Aguarde a criação do banco de dados
5. No painel do MySQL, vá em **"Variables"** e anote:
   - `MYSQL_HOST`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

### Opção B: Usar banco de dados externo

Se você já tem um MySQL hospedado (ex: AWS RDS, PlanetScale, etc.), anote as credenciais.

## 📊 Passo 2: Importar o Schema do Banco

1. Conecte-se ao seu banco MySQL
2. Execute o arquivo `reconectaDB.sql` que está na raiz do projeto:

```sql
-- Você pode usar o Railway CLI ou qualquer cliente MySQL
-- No Railway, use: railway connect MySQL
```

## 🚀 Passo 3: Deploy da Aplicação

1. No Railway Dashboard, clique em **"+ New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Autorize o Railway a acessar seus repositórios
4. Selecione o repositório **"Re.Conecta"**
5. Aguarde o deploy automático

## ⚙️ Passo 4: Configurar Variáveis de Ambiente

1. No painel do seu projeto no Railway, clique em **"Variables"**
2. Adicione as seguintes variáveis com os valores do seu banco MySQL:

```
MYSQL_HOST=<host-do-banco>
MYSQL_USER=<usuario>
MYSQL_PASSWORD=<senha>
MYSQL_DATABASE=ReconectaDB
```

### Se estiver usando MySQL do Railway no mesmo projeto:

As variáveis já estarão disponíveis automaticamente! Você pode referenciá-las assim:

```
MYSQL_HOST=${{MySQL.MYSQL_HOST}}
MYSQL_USER=${{MySQL.MYSQL_USER}}
MYSQL_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
MYSQL_DATABASE=${{MySQL.MYSQL_DATABASE}}
```

## ✅ Passo 5: Verificar o Deploy

1. Aguarde o build finalizar
2. Clique em **"View Logs"** para acompanhar
3. Quando finalizar, clique em **"Settings"** > **"Domains"**
4. Clique em **"Generate Domain"** para obter uma URL pública
5. Acesse a URL gerada para testar sua aplicação

## 🔧 Solução de Problemas

### Erro: "Connection refused"
- Verifique se as variáveis de ambiente estão corretas
- Certifique-se de que o MySQL está rodando

### Erro: "Table doesn't exist"
- Execute o arquivo `reconectaDB.sql` no banco de dados

### Deploy falha no build
- Verifique os logs em "View Logs"
- Certifique-se de que o arquivo `nixpacks.toml` está no repositório

### Página não carrega CSS/JS
- Verifique se os caminhos dos arquivos estão corretos (sem barra inicial)
- Exemplo correto: `css/style.css` (não `/css/style.css`)

## 📝 Notas Importantes

- O Railway pode colocar o serviço em sleep após 5 minutos de inatividade (plano free)
- Para produção, considere usar o plano pago
- Sempre teste localmente antes de fazer deploy
- Mantenha suas variáveis de ambiente seguras

## 🔗 Links Úteis

- [Documentação do Railway](https://docs.railway.app)
- [Railway MySQL Plugin](https://docs.railway.app/databases/mysql)
- [Railway CLI](https://docs.railway.app/develop/cli)
