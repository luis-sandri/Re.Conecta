<?php
    error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
    include_once('conexao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];

    $usuario_id = $_POST['usuario_id'];
    $data_nasc = $_POST['data_nasc'];
    $genero = $_POST['genero'];
    $tipo_documento = $_POST['tipo_documento'];
    $documento = $_POST['documento'];

    $stmt = $conexao->prepare("INSERT INTO perfis_doador (id, data_nasc, genero, tipo_documento, documento) VALUES (?,?,?,?,?)");
    $stmt->bind_param("issss", $usuario_id, $data_nasc, $genero, $tipo_documento, $documento);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Doador cadastrado com sucesso',
            'data' => [
                'usuario_id' => $usuario_id
            ]
        ];
    }else{
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Não foi possível cadastrar o Doador',
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);
?>
