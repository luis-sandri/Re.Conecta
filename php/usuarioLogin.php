<?php
    include_once('conexao.php');

    $retorno = [
        'status' => '', // ok ou nok
        'mensagem' => '', // mensagem de sucesso ou erro
        'data' => [] // efetivamente o retorno
    ];

    // Buscar usuário apenas por email
    $stmt = $conexao->prepare("SELECT * FROM usuario WHERE email = ?");
    $stmt->bind_param("s", $_POST['email']);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();

        // Verificar senha usando bcrypt
        if(password_verify($_POST['senha'], $usuario['senha'])) {
            // Senha correta - login bem-sucedido
            $tabela = [$usuario];

            $retorno = [
                'status' => 'ok',
                'mensagem' => 'Login realizado com sucesso',
                'data' => $tabela
            ];

            // Iniciando a sessão
            session_start();
            $_SESSION['usuario'] = $tabela;
        } else {
            // Senha incorreta
            $retorno = [
                'status' => 'not ok',
                'mensagem' => 'Email ou senha incorretos',
                'data' => []
            ];
        }
    } else {
        // Usuário não encontrado
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Email ou senha incorretos',
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);

