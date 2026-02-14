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
        $cnpj = $_POST['cnpj'];

        $stmt = $conexao->prepare("UPDATE perfis_ong SET CNPJ = ? WHERE id = ?");
        $stmt->bind_param("si", $cnpj, $id);
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
