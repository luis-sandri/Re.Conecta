<?php
    include_once('conexao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];

    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $conexao->prepare("SELECT * FROM usuario WHERE id = ?");
        $stmt->bind_param("i", $id);
    }else{
        $stmt = $conexao->prepare("SELECT * FROM usuario");
    }

    $stmt->execute();
    $resultado = $stmt->get_result();

    $tabela = [];
    if($resultado->num_rows > 0) {
        while($linha = $resultado->fetch_assoc()) {
            $tabela[] = $linha;
        }

        $retorno = [
            'status' => 'ok',
            'mensagem' => 'Registros encontrados',
            'data' => $tabela
        ];
    }else {
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Nenhum registro encontrado',
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);