<?php
    error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
    include_once('conexao.php');


    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];


    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $telefone = $_POST['telefone'];
    $role = $_POST['role'];

    $stmt = $conexao->prepare("INSERT INTO usuario(nome,email,senha,telefone,role) VALUES (?,?,?,?,?)");
    $stmt->bind_param("sssss", $nome, $email, $senha, $telefone, $role);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $id_usuario_novo = $conexao->insert_id;
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Registro inserido com sucesso',
            'data' => [
                'usuario_id' => $id_usuario_novo,
                'role' => $role
            ]
        ];
    }else{
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Não foi possível inserir o registro',
            'data' => []
        ];
    }


    $stmt->close();
    $conexao->close();
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);
?>
