<?php
    include_once('conexao.php');

    $retorno = [
        'status' => '', 
        'mensagem' => '', 
        'data' => []
    ];

    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $conexao->prepare("DELETE FROM endereco WHERE id = ?");
        $stmt->bind_param("i",$id);

        if ($stmt->execute()) {
            $retorno = [
                'status' => 'ok',
                'mensagem' => 'endereço excluído com sucesso!',
                'data' => []
            ];
        } else {
            $retorno = [
                'status' => 'not ok',
                'mensagem' => 'Erro ao excluir ONG',
                'data' => []
            ];
        }
        $stmt->close();
    } else {
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'ID não informado',
            'data' => []
        ];
    }

    $conexao->close();
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);
?>

    