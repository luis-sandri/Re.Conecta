<?php
    error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
    include_once('conexao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];


    $usuario_id = $_POST['usuario_id'];
    $cnpj = $_POST['cnpj'];

    $stmt = $conexao->prepare("INSERT INTO perfis_ong (id,CNPJ) VALUES (?,?)");
    $stmt->bind_param("is", $usuario_id, $cnpj);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'ONG cadastrada com sucesso',
            'data' => [
                'usuario_id' => $usuario_id
            ]
        ];
    }else{
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Não foi possível cadastrar a ONG',
            'data' => []
        ];
    }


    $stmt->close();
    $conexao->close();
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);
?>
