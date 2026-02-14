<?php
    include_once('conexao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '', 
        'data' => []
    ];

    if(isset($_GET['id'])) {
        $id = $_GET['id'];
    
        $rua              = $_POST['rua'];
        $bairro           = $_POST['bairro'];
        $complemento      = $_POST['complemento'];

      $stmt = $conexao->prepare("UPDATE endereco SET Rua = ?, Bairro = ?, Complemento = ? WHERE id = ?");
      $stmt->bind_param("sssi", $rua, $bairro, $complemento , $id);
      $stmt->execute(); // executa a query

        if($stmt->affected_rows > 0){
            $retorno = [
                'status' => 'ok',
                'mensagem' => 'Registro alterado com sucesso', 
                'data' => []
            ];
        }else{
            $retorno = [
                'status' => 'not ok',
                'mensagem' => 'Não foi possível alterar o registro', 
                'data' => []
            ];
        }

        $stmt->close();
    }else{
        $retorno = [
            'status' => 'not ok', 
            'mensagem' => 'Não foi possível alterar o registro sem ID', 
            'data' => [] 
        ];
    }
    $conexao->close();

    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);