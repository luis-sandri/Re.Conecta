<?php
// Script para criar admin via PHP (garante hash correto)
// Acesse via: https://seu-site.railway.app/criarAdmin.php
// APAGUE ESTE ARQUIVO depois de usar!

include_once('php/conexao.php');

// Deletar admin antigo se existir
$stmt = $conexao->prepare("DELETE FROM usuario WHERE email = ?");
$email = 'admin@reconecta.com';
$stmt->bind_param("s", $email);
$stmt->execute();
echo "<p>✓ Admin antigo deletado (se existia)</p>";

// Criar novo admin com bcrypt
$nome = "Admin Sistema";
$email = "admin@reconecta.com";
$senha_plain = "senha123";
$senha_hash = password_hash($senha_plain, PASSWORD_BCRYPT);
$telefone = "(11) 98765-4321";
$role = "ADMIN";

$stmt = $conexao->prepare("INSERT INTO usuario (nome, email, senha, telefone, role) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nome, $email, $senha_hash, $telefone, $role);

if($stmt->execute()) {
    $admin_id = $conexao->insert_id;
    echo "<h1 style='color: green;'>✓ Admin criado com sucesso!</h1>";
    echo "<p><strong>ID:</strong> $admin_id</p>";
    echo "<p><strong>Email:</strong> admin@reconecta.com</p>";
    echo "<p><strong>Senha:</strong> senha123</p>";
    echo "<p><strong>Hash gerado:</strong> <code style='background:#eee;padding:5px;display:block;'>$senha_hash</code></p>";
    echo "<hr>";
    echo "<h2>Agora teste o login:</h2>";
    echo "<p>1. Vá para a página de login</p>";
    echo "<p>2. Use: admin@reconecta.com / senha123</p>";
    echo "<p>3. Se funcionar, <strong style='color:red;'>APAGUE ESTE ARQUIVO (criarAdmin.php) IMEDIATAMENTE!</strong></p>";

    // Testar se o hash funciona
    if(password_verify($senha_plain, $senha_hash)) {
        echo "<p style='color:green;'>✓ Hash verificado - password_verify() funcionou!</p>";
    } else {
        echo "<p style='color:red;'>✗ ERRO: password_verify() falhou!</p>";
    }
} else {
    echo "<h1 style='color: red;'>✗ ERRO ao criar admin</h1>";
    echo "<p>Erro: " . $stmt->error . "</p>";
}

$stmt->close();
$conexao->close();
?>
