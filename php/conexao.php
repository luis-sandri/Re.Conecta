<?php
// Configuração para o acesso ao MySQL.
$servidor = "localhost:3306";
$usuario = "root";
$senha = "";
$banco = "ReconectaDB";

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
