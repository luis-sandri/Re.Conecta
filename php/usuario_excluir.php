<?php
    include_once('conexao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];

    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $stmt = $conexao->prepare("DELETE FROM usuario WHERE id = ?");
        $stmt->bind_param("i",$id);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status' => 'ok',
                'mensagem' => 'Registro excluído com sucesso',
                'data' => []
            ];
        }else{
            $retorno = [
                'status' => 'not ok',
                'mensagem' => 'Não foi possível excluir o registro',
                'data' => []
            ];
        }

        $stmt->close();
    }else{
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Não foi possível excluir o registro SEM ID',
            'data' => []
        ];
    }
    $conexao->close();
    
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);