<?php
    include_once('conexao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];

    if(isset($_GET['id'])) {
        $id = $_GET['id'];

        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $telefone = $_POST['telefone'];
        $role = $_POST['role'];

        // Se a senha estiver vazia, não atualiza ela
        if(!empty($senha)) {
            $stmt = $conexao->prepare("UPDATE usuario SET nome = ?, email = ?, senha = MD5(?), telefone = ?, role = ? WHERE id = ?");
            $stmt->bind_param("sssssi", $nome, $email, $senha, $telefone, $role, $id);
        } else {
            $stmt = $conexao->prepare("UPDATE usuario SET nome = ?, email = ?, telefone = ?, role = ? WHERE id = ?");
            $stmt->bind_param("ssssi", $nome, $email, $telefone, $role, $id);
        }


        $stmt->execute();

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
    } else {
        $retorno = [
            'status'=> 'not ok',
            'mensagem' => 'Não foi possível alterar o registro sem ID',
            'data' => []
        ];
    }
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>
