<?php
    error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
    include_once('conexao.php');
    include_once('verificaPermissao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];

    $usuario_id = $_POST['usuario_id'];
    $CPF = $_POST['CPF'];
    $tipo_email = $_POST['tipo_email'];
    $data_nasc = $_POST['data_nasc'];
    $genero = $_POST['genero'];

    $stmt = $conexao->prepare("INSERT INTO perfis_tecnico (id, CPF, tipo_email, data_nasc, genero) VALUES (?,?,?,?,?)");
    $stmt->bind_param("issss", $usuario_id, $CPF, $tipo_email, $data_nasc, $genero);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Técnico cadastrado com sucesso',
            'data' => [
                'usuario_id' => $usuario_id
            ]
        ];
    }else{
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Não foi possível cadastrar o Técnico',
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);
?>
