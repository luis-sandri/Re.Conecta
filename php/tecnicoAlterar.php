<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 0); // Não mostrar erros em produção

    include_once('conexao.php');
    include_once('verificaPermissao.php');

    $retorno = [
        'status' => '',
        'mensagem' => '',
        'data' => []
    ];

    try {
        if(isset($_GET['id'])) {
            $id = $_GET['id'];
            $CPF = $_POST['CPF'] ?? '';
            $tipo_email = $_POST['tipo_email'] ?? '';
            $data_nasc = $_POST['data_nasc'] ?? '';
            $genero = $_POST['genero'] ?? '';

            if(empty($CPF) || empty($tipo_email) || empty($data_nasc) || empty($genero)) {
                $retorno = [
                    'status' => 'not ok',
                    'mensagem' => 'Todos os campos são obrigatórios',
                    'data' => []
                ];
            } else {
                $stmt = $conexao->prepare("UPDATE perfis_tecnico SET CPF = ?, tipo_email = ?, data_nasc = ?, genero = ? WHERE id = ?");
                $stmt->bind_param("ssssi", $CPF, $tipo_email, $data_nasc, $genero, $id);
                $stmt->execute();

                if($stmt->affected_rows > 0){
                    $retorno = [
                        'status' => 'ok',
                        'mensagem' => 'Registro alterado com sucesso',
                        'data' => []
                    ];
                } else {
                    $retorno = [
                        'status' => 'not ok',
                        'mensagem' => 'Nenhuma alteração foi realizada. Verifique se os dados foram modificados.',
                        'data' => []
                    ];
                }

                $stmt->close();
            }
        } else {
            $retorno = [
                'status'=> 'not ok',
                'mensagem' => 'Não foi possível alterar o registro sem ID',
                'data' => []
            ];
        }
    } catch (Exception $e) {
        $retorno = [
            'status' => 'not ok',
            'mensagem' => 'Erro ao processar a solicitação: ' . $e->getMessage(),
            'data' => []
        ];
    }

    $conexao->close();

    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);
?>