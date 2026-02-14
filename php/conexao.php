<?php
// Configuração para o acesso ao MySQL.
// Usa variáveis de ambiente se disponíveis (para deploy), senão usa valores locais (para desenvolvimento)
$servidor = getenv('MYSQL_HOST') ?: "localhost:3306";
$usuario = getenv('MYSQL_USER') ?: "root";
$senha = getenv('MYSQL_PASSWORD') ?: "";
$banco = getenv('MYSQL_DATABASE') ?: "ReconectaDB";

$conexao = new mysqli($servidor, $usuario, $senha, $banco);

if($conexao -> connect_error) {
    $retorno_erro = [
        'status' => 'not ok',
        'mensagem' => 'Falha na conexão com o banco de dados'. $conexao->connect_error,
        'data' => []
    ];
    
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno_erro);

    die();
}
