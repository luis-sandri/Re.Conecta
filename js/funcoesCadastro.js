document.addEventListener('DOMContentLoaded', function () {

    function setupEventListeners() {
        const btnAbrirModal = document.getElementById('btnAbrirModal');
        const modals = {
            doador: new bootstrap.Modal(document.getElementById('modalDoador')),
            tecnico: new bootstrap.Modal(document.getElementById('modalTecnico')),
            ong: new bootstrap.Modal(document.getElementById('modalOng'))
        };

        btnAbrirModal.addEventListener('click', () => {
            const tipoSelecionado = document.querySelector('input[name="tipoCadastro"]:checked').value;

            if (tipoSelecionado === "doador") {
                modals.doador.show();
            } else if (tipoSelecionado === "tecnico") {
                modals.tecnico.show();
            } else if (tipoSelecionado === "ong") {
                modals.ong.show();
            }
        });

        // Lógica para alternar entre campos CPF/CNPJ no formulário de Doador
        document.querySelectorAll('input[name="tipo_documento"]').forEach(radio => {
            radio.addEventListener('change', function () {
                document.getElementById('campoCpfDoador').classList.toggle('d-none', this.value !== 'CPF');
                document.getElementById('campoCnpjDoador').classList.toggle('d-none', this.value !== 'CNPJ');
            });
        });

        // Lógica para alternar entre Email Pessoal/Institucional no formulário de Técnico
        document.querySelectorAll('input[name="tipoEmailTecnico"]').forEach(radio => {
            radio.addEventListener('change', function () {
                document.getElementById('campoEmailPessoal').classList.toggle('d-none', this.value !== 'pessoal');
                document.getElementById('campoEmailInstitucional').classList.toggle('d-none', this.value !== 'institucional');
            });
        });
    }
    
    setupEventListeners(); // Chama a função que configura todos os eventos

});
