<?php
    include_once('conexao.php');
    include_once('verificaPermissao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];

    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $data_nasc = $_POST['data_nasc'];
        $genero = $_POST['genero'];
        $tipo_documento = $_POST['tipo_documento'];
        $documento = $_POST['documento'];

        $stmt = $conexao->prepare("UPDATE perfis_doador SET data_nasc = ?, genero = ?, tipo_documento = ?, documento = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $data_nasc, $genero, $tipo_documento, $documento, $id);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status' => 'ok',
                'mensagem' => 'Registro alterado com sucesso',
                'data' => []
            ];
        } else {
            $retorno = [
                'status' => 'not ok',
                'mensagem' => 'Não foi possível alterar o registro',
                'data' => []
            ];
        }

        $stmt->close();
    } else {
        $retorno = [
            'status'=> 'not ok',
            'mensagem' => 'Não foi possível alterar o registro sem ID',
            'data' => []
        ];
    }
    $conexao->close();

    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);
?>
