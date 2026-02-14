<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    include_once('conexao.php');
    include_once('verificaPermissao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];

    // Validar se os campos POST foram recebidos
    if (!isset($_POST['nome']) || !isset($_POST['email']) || !isset($_POST['senha']) || !isset($_POST['telefone']) || !isset($_POST['role'])) {
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Campos obrigatórios não foram enviados',
            'data' => []
        ];
        header("Content-type:application/json;charset=utf-8");
        echo json_encode($retorno);
        exit;
    }

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $telefone = $_POST['telefone'];
    $role = $_POST['role'];

    // Hash da senha usando bcrypt (muito mais seguro que MD5)
    $senha_hash = password_hash($senha, PASSWORD_BCRYPT);

    try {
        $stmt = $conexao->prepare("INSERT INTO usuario(nome,email,senha,telefone,role) VALUES (?,?,?,?,?)");
        $stmt->bind_param("sssss", $nome, $email, $senha_hash, $telefone, $role);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $id_usuario_novo = $conexao->insert_id;
            $retorno = [
                'status' => 'ok',
                'mensagem' => 'Registro inserido com sucesso',
                'data' => [
                    'usuario_id' => $id_usuario_novo,
                    'role' => $role
                ]
            ];
        }else{
            $retorno = [
                'status' => 'not ok',
                'mensagem' => 'Não foi possível inserir o registro',
                'data' => []
            ];
        }

        $stmt->close();
    } catch (Exception $e) {
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Erro: ' . $e->getMessage(),
            'data' => []
        ];
    }

    $conexao->close();
    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
?>
