<?php
    // Verifica se o usuário tem permissão para modificar dados
    // VISITANTE: apenas leitura
    // Outros roles: podem criar, alterar e excluir

    session_start();

    if(!isset($_SESSION['usuario'])) {
        // Usuário não está logado
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Você precisa estar logado para realizar esta ação',
            'data' => []
        ];
        header("Content-type:application/json;charset=utf-8");
        echo json_encode($retorno);
        exit;
    }

    // Pega a role do usuário logado
    $usuario = $_SESSION['usuario'][0];
    $role = strtoupper(trim($usuario['role']));

    // VISITANTE não pode modificar dados
    if($role === 'VISITANTE') {
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Você não tem permissão para realizar esta ação. Visitantes podem apenas visualizar dados.',
            'data' => []
        ];
        header("Content-type:application/json;charset=utf-8");
        echo json_encode($retorno);
        exit;
    }

    // Roles permitidas: ADMIN, DOADOR, TECNICO, ONG
    // Se chegou aqui, tem permissão para continuar
?>
