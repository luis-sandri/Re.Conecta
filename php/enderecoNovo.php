<?php
    include_once('conexao.php');
    include_once('verificaPermissao.php');

    $retorno = [
        'status' => '', 
        'mensagem' => '',
        'data' => [] 
    ];
         
        $usuario_id = $_POST['usuario_id'];
        $rua     =  $_POST['rua'];
        $bairro  =  $_POST['bairro'];
        $complemento = $_POST['complemento'];

      $stmt = $conexao->prepare("INSERT INTO endereco (id, Rua, Bairro, Complemento) VALUES (?, ?, ?, ?)");
      $stmt->bind_param("isss", $usuario_id, $rua, $bairro, $complemento);
      $stmt->execute();



        if($stmt->affected_rows > 0){
            $retorno = [
                'status' => 'ok', 
                'mensagem' => 'Registro inserido com sucesso', 
                'data' => [] 
            ];
        }else{
            $retorno = [
                'status' => 'not ok', 
                'mensagem' => 'Não foi possível inserir o registro (ou o endereço já existe)', 
                'data' => [] 
            ];
        }
    
    $stmt->close();
    $conexao->close();
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);