// This script can be expanded for future functionality
document.addEventListener('DOMContentLoaded', () => {
    const membersData = [
        { name: 'Leonardo', status: 'paid', amount: 56 },
        { name: 'Luiz', status: 'paid', amount: 43 },
        { name: 'Jhoww', status: 'paid', amount: 43 },
        { name: 'Lucas', status: 'paid', amount: 43 },
        { name: 'Hiago', status: 'paid', amount: 43 },
        { name: 'Caio', status: 'paid', amount: 43 },
        { name: 'Lopes', status: 'paid', amount: 43 },
        { name: 'Danilo', status: 'paid', amount: 43 },
        { name: 'Paulo', status: 'paid', amount: 43 },
        { name: 'Gustavo', status: 'paid', amount: 43 },
        { name: 'Mike', status: 'paid', amount: 43 },
        { name: 'Will', status: 'paid', amount: 43 },
        { name: 'Yago', status: 'paid', amount: 43 },
        { name: 'Eduardo', status: 'paid', amount: 43 },
        { name: 'Gui', status: 'paid', amount: 43 },
        { name: 'Renan', status: 'paid', amount: 43 },
        { name: 'Axel', status: 'paid', amount: 43 },
        { name: 'Mauricio', status: 'paid', amount: 43 },
        { name: 'Elielton', status: 'pending-today', amount: 43 }
    ];

    const tableBody = document.querySelector('#membersTable tbody');
    const totalAmountElement = document.getElementById('totalAmount');

    function renderMembers() {
        tableBody.innerHTML = '';
        let totalAmount = 0;

        membersData.forEach(member => {
            const row = document.createElement('tr');
            
            const statusClass = {
                'paid': 'paid',
                'pending': 'pending',
                'pending-today': 'pending',
                'pending-next': 'pending'
            };

            const statusText = {
                'paid': 'Pago',
                'pending': 'Pendente',
                'pending-today': 'Pendente - Hoje',
                'pending-next': 'Pendente Próxima Semana'
            };

            row.innerHTML = `
                <td>${member.name}</td>
                <td>
                    <span class="status ${statusClass[member.status]}">
                        ${statusText[member.status]}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-success action-btn pay-btn" data-name="${member.name}">Pagar</button>
                </td>
            `;

            tableBody.appendChild(row);
            
            if (member.status === 'paid') {
                totalAmount += member.amount;
            }
        });

        totalAmountElement.textContent = `R$ ${totalAmount.toFixed(2).replace('.', ',')}`;

        // Add event listeners to pay buttons
        document.querySelectorAll('.pay-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const memberName = e.target.getAttribute('data-name');
                const memberIndex = membersData.findIndex(m => m.name === memberName);
                
                if (memberIndex !== -1 && membersData[memberIndex].status !== 'paid') {
                    membersData[memberIndex].status = 'paid';
                    membersData[memberIndex].amount = 43;
                    renderMembers();
                }
            });
        });
    }

    renderMembers();
});