<?php
    // Verifica se o usuário tem permissão para modificar dados
    // Apenas ADMIN pode criar, alterar e excluir
    // Outros roles (VISIT, DOADOR, TECNICO, ONG): apenas leitura

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

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

    // Apenas ADMIN pode modificar dados
    if($role !== 'ADMIN') {
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Você não tem permissão para realizar esta ação. Apenas administradores podem criar, alterar ou excluir dados.',
            'data' => []
        ];
        header("Content-type:application/json;charset=utf-8");
        echo json_encode($retorno);
        exit;
    }

    // Se chegou aqui, é ADMIN e tem permissão para continuar
?>
