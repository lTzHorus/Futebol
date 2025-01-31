class GerenciadorMensalistas {
    constructor() {
        this.mensalistas = [];
        this.statusFutebol = localStorage.getItem('statusFutebol') || 'nao';
        this.mesReferencia = localStorage.getItem('mesReferencia') || '';
        this.inicializarEventListeners();
        this.carregarMensalistas();
        this.configurarStatusFutebol();
        this.configurarMesReferencia();
    }

    async carregarMensalistas() {
        try {
            const response = await fetch('/api/mensalistas');
            this.mensalistas = await response.json();
            this.renderizarMensalistas();
        } catch (error) {
            console.error("Erro ao carregar mensalistas:", error);
        }
    }

    async adicionarMensalista() {
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const plano = document.getElementById('plano').value;
        const valorMensalidade = document.getElementById('valorMensalidade').value;
        const mesPagamento = document.getElementById('mesPagamento').value;

        const novoMensalista = {
            nome,
            telefone,
            dataNascimento,
            plano,
            valorMensalidade,
            mesPagamento
        };

        try {
            const response = await fetch('/api/mensalistas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoMensalista),
            });

            if (response.ok) {
                this.carregarMensalistas();
                this.limparFormulario();
            } else {
                console.error("Erro ao adicionar mensalista:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao adicionar mensalista:", error);
        }
    }

    async excluirMensalista(id) {
        try {
            const response = await fetch(`/api/mensalistas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.carregarMensalistas();
            } else {
                console.error("Erro ao excluir mensalista:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao excluir mensalista:", error);
        }
    }

    renderizarMensalistas() {
        const listaMensalistas = document.getElementById('mensalistasLista');
        listaMensalistas.innerHTML = '';

        const mensalistasFiltered = this.mesReferencia 
            ? this.mensalistas.filter(m => m.mesPagamento === this.mesReferencia)
            : this.mensalistas;

        mensalistasFiltered.forEach(mensalista => {
            const cardMensalista = document.createElement('div');
            cardMensalista.classList.add('mensalista-card');
            cardMensalista.innerHTML = `
                <div class="card-header">
                    <h3>${mensalista.nome}</h3>
                    <button class="delete-btn" data-id="${mensalista._id}">🗑️</button>
                </div>
                
                <p><strong>Telefone:</strong> ${mensalista.telefone}</p>
                <p><strong>Plano:</strong> ${mensalista.plano}</p>
                <p><strong>Valor Mensalidade:</strong> R$ ${mensalista.valorMensalidade}</p>
                <p><strong>Mês de Pagamento:</strong> ${mensalista.mesPagamento}</p>
            `;
            listaMensalistas.appendChild(cardMensalista);

            // Adicionar evento de exclusão
            const deleteBtn = cardMensalista.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => this.excluirMensalista(mensalista._id));
        });

        // Mostrar status do futebol
        const statusElement = document.createElement('div');
        statusElement.classList.add('football-status');
        statusElement.innerHTML = `
            <strong>Status do Futebol:</strong> 
            ${this.statusFutebol === 'sim' ? '⚽ Teremos Futebol!' : '❌ Não teremos Futebol'}
        `;
        listaMensalistas.prepend(statusElement);
    }

    limparFormulario() {
        document.getElementById('formMensalista').reset();
    }

    inicializarEventListeners() {
        const addMensalistaBtn = document.getElementById('addMensalistaBtn');
        const modalCadastro = document.getElementById('modalCadastro');
        const closeBtnModal = document.querySelector('.close');
        const formMensalista = document.getElementById('formMensalista');
        const footballStatus = document.getElementById('footballStatus');
        const mesReferencia = document.getElementById('mesReferencia');

        addMensalistaBtn.addEventListener('click', () => {
            modalCadastro.style.display = 'block';
        });

        closeBtnModal.addEventListener('click', () => {
            modalCadastro.style.display = 'none';
        });

        formMensalista.addEventListener('submit', (e) => {
            e.preventDefault();
            this.adicionarMensalista();
            modalCadastro.style.display = 'none';
        });

        footballStatus.addEventListener('change', (e) => {
            this.statusFutebol = e.target.value;
            localStorage.setItem('statusFutebol', this.statusFutebol);
            this.renderizarMensalistas();
        });

        mesReferencia.addEventListener('change', (e) => {
            this.mesReferencia = e.target.value;
            localStorage.setItem('mesReferencia', this.mesReferencia);
            this.renderizarMensalistas();
        });
    }

    configurarStatusFutebol() {
        const footballStatus = document.getElementById('footballStatus');
        footballStatus.value = this.statusFutebol;
    }

    configurarMesReferencia() {
        const mesReferencia = document.getElementById('mesReferencia');
        mesReferencia.value = this.mesReferencia;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GerenciadorMensalistas();
});