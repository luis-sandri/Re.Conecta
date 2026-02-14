<?php
// Script temporário para gerar hash bcrypt da senha "senha123"
// Acesse via: https://seu-site.railway.app/gerarHash.php
// APAGUE ESTE ARQUIVO depois de usar!

$senha = "senha123";
$hash = password_hash($senha, PASSWORD_BCRYPT);

echo "<h1>Hash Bcrypt Gerado</h1>";
echo "<p><strong>Senha:</strong> senha123</p>";
echo "<p><strong>Hash:</strong> <code>$hash</code></p>";
echo "<hr>";
echo "<h2>Use este SQL no MySQL Workbench:</h2>";
echo "<pre>";
echo "-- Deletar usuários antigos\n";
echo "DELETE FROM usuario;\n\n";
echo "-- Inserir novo Admin com bcrypt\n";
echo "INSERT INTO usuario (nome, email, senha, telefone, role) VALUES\n";
echo "('Admin Sistema', 'admin@reconecta.com', '$hash', '(11) 98765-4321', 'ADMIN');\n";
echo "</pre>";
?>
