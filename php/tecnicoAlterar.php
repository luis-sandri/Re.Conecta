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
        $CPF = $_POST['CPF'];
        $tipo_email = $_POST['tipo_email'];
        $data_nasc = $_POST['data_nasc'];
        $genero = $_POST['genero'];
   
        $stmt = $conexao->prepare("UPDATE perfis_tecnico SET CPF = ?, tipo_email = ?, data_nasc = ?, genero = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $CPF, $tipo_email, $data_nasc, $genero, $id);
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
