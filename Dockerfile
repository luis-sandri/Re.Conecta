# Use PHP 8.2 com Apache
FROM php:8.2-cli

# Instala extensões necessárias
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Define o diretório de trabalho
WORKDIR /app

# Copia todos os arquivos do projeto
COPY . .

# Expõe a porta que será usada
EXPOSE 8080

# Comando para iniciar o servidor PHP
CMD ["php", "-S", "0.0.0.0:8080", "-t", "."]
