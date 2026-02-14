async function validaSessao(){
    const retorno = await fetch("../php/validaSessao.php");
    const resposta = await retorno.json();
    if(resposta.status == "not ok"){
        window.location.href = "../login/";
    }
}
