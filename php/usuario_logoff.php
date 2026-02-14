<?php
    session_start(); // Pega sessão existente
    session_unset(); // Limpa a sessão
    session_destroy(); // Destrói a sessão
    $retorno = ['status' => 'ok', 'mensagem' => '', 'data' => []];
    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);