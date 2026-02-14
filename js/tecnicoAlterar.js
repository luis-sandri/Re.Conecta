document.addEventListener("DOMContentLoaded", () => {
    validaSessao();

    // Inicializar validador de CPF
    adicionarValidacaoCPF('tecnico-CPF');

    var url = new URLSearchParams(window.location.search);
    var id = url.get("id");
    buscarDados(id);
});

async function buscarDados(id){
    try {
        const retorno = await fetch("../php/tecnicoGet.php?id="+id);
        const textoResposta = await retorno.text();

        let resposta;
        try {
            resposta = JSON.parse(textoResposta);
        } catch (e) {
            console.error("Erro ao fazer parse de JSON:", e);
            console.error("Resposta recebida:", textoResposta);
            alert("ERRO! Servidor não retornou JSON válido. Veja o console (F12).");
            return;
        }

        if(resposta.status == "ok"){
            var reg = resposta.data[0];
            document.getElementById("tecnico-id").value = id;
            document.getElementById("tecnico-CPF").value = reg.CPF;
            if(reg.tipo_email === "pessoal") {
                document.getElementById("tipo_pessoal").checked = true;
            } else {
                document.getElementById("tipo_institucional").checked = true;
            }
            document.getElementById("tecnico-data_nasc").value = reg.data_nasc;
            document.getElementById("tecnico-genero").value = reg.genero;
        }else{
            alert("ERRO! " + resposta.mensagem)
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("ERRO! Não foi possível carregar os dados do técnico.");
    }
}

document.getElementById('form-tecnico').addEventListener('submit', function(event){
    event.preventDefault();
    alterar_tecnico();
});

async function alterar_tecnico(){
    var id = document.getElementById("tecnico-id").value;
    var CPF = document.getElementById("tecnico-CPF").value;
    var tipo_email_element = document.querySelector('input[name="tipo_email"]:checked');

    if (!tipo_email_element) {
        alert("ERRO! Por favor, selecione o tipo de email.");
        return;
    }

    var tipo_email = tipo_email_element.value;
    var data_nasc = document.getElementById("tecnico-data_nasc").value;
    var genero = document.getElementById("tecnico-genero").value;

    // Validar CPF antes de enviar
    if (!validarCPF(CPF)) {
        alert("ERRO! CPF inválido. Por favor, corrija antes de salvar.");
        return;
    }

    // Remover formatação do CPF antes de enviar (apenas números)
    CPF = CPF.replace(/[^\d]/g, '');

    const tecnico_alterado = new FormData();
    tecnico_alterado.append("CPF", CPF);
    tecnico_alterado.append("tipo_email", tipo_email);
    tecnico_alterado.append("data_nasc", data_nasc);
    tecnico_alterado.append("genero", genero);

    try {
        const retorno = await fetch("../php/tecnicoAlterar.php?id="+id, {
            method: "POST",
            body: tecnico_alterado
        });

        const textoResposta = await retorno.text();
        console.log("Resposta do servidor:", textoResposta);

        let resposta;
        try {
            resposta = JSON.parse(textoResposta);
        } catch (e) {
            console.error("Erro ao fazer parse de JSON:", e);
            console.error("Resposta recebida:", textoResposta);
            alert("ERRO! Servidor não retornou JSON válido. Veja o console (F12).");
            return;
        }

        if(resposta.status == "ok"){
            alert("Sucesso! " + resposta.mensagem);
            window.location.href = 'gerenciarTecnico.html';
        }else{
            alert("ERRO! " + resposta.mensagem);
            console.error("Detalhes do erro:", resposta);
        }
    } catch (error) {
        console.error("Erro ao alterar técnico:", error);
        alert("ERRO! Não foi possível processar a requisição.");
    }
}
