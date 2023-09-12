class Cliente {
    constructor() {
        this.clientes = this.getLocalStorageData();
    }

    static fields = ['cpf', 'nome', 'cep', 'endereco', 'bairro', 'cidade', 'estado', 'observacoes'];

    getLocalStorageData() {
        return JSON.parse(localStorage.getItem("tbClientes")) || [];
    }

    setLocalStorageData(data) {
        localStorage.setItem("tbClientes", JSON.stringify(data));
    }

    salva(cliente) {
        if (document.getElementById('cpf').getAttribute('disabled') === 'disabled') {
            this.apaga(cliente.cpf);
        }
        this.clientes.push(cliente);
        this.setLocalStorageData(this.clientes);
        alert('Cliente salvo com sucesso!');
        this.limpa();
        this.atualiza();        
        return true;
    }

    apaga(cpf) {
        this.clientes = this.clientes.filter(cliente => cliente.cpf != cpf);
        this.setLocalStorageData(this.clientes);
        this.atualiza();
    }

    limpa() {
        Cliente.fields.forEach(field => document.getElementById(field).value = '');
        document.getElementById('cpf').removeAttribute('disabled');
    }

    edita(cliente) {
        document.getElementById('cpf').setAttribute('disabled', 'disabled');        
        Cliente.fields.forEach(field => document.getElementById(field).value = cliente[field]);
    }

    lista() {
        return `
        <table border='1' class='table table-bordered caption-top'>
         <caption>Relação dos Clientes</caption>
            <thead class='table-primary'>
                <th>CPF</th>
                <th>Nome</th>
                <th>CEP</th>
                <th>Endereço</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Observações</th>
                <th>Opções</th>
            </thead>
            <tbody>
            ${this.clientes.map(cliente => this.renderClienteRow(cliente)).join('')}
            </tbody>
        </table>`;
    }

    renderClienteRow(cliente) {
        return `<tr>
            <td>${cliente.cpf}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cep}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.bairro}</td>
            <td>${cliente.cidade}</td>
            <td>${cliente.estado}</td>
            <td>${cliente.observacoes}</td>
            <td>
                <button class='btn btn-danger btn-sm' onClick='cliente.apaga("${cliente.cpf}")'>🗑️Apagar</button>
                <button class='btn btn-warning btn-sm' onClick='cliente.edita(${JSON.stringify(cliente)})'>📝Editar</button>
            </td>
        </tr>`;
    }

    atualiza() {
        document.getElementById('listagem').innerHTML = this.lista();
    }
}

const cliente = new Cliente();

document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault(); // evita o comportamento padrão do botão
    const registro = {
        cpf: document.getElementById('cpf').value,
        nome: document.getElementById('nome').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        observacoes: document.getElementById('observacoes').value
    };
    cliente.salva(registro);
});

window.onload = function () {
    cliente.atualiza();
};

document.getElementById('buscarCep').addEventListener('click', () => {
    const cep = document.getElementById('cep').value;

    // Verifica se o CEP possui o formato correto (opcional)
    const cepPattern = /^[0-9]{8}$/;
    if (!cepPattern.test(cep)) {
        alert('Digite um CEP válido com 8 dígitos.');
        return;
    }

    // Faz a chamada à API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                // Preenche os campos do endereço com os dados da API
                document.getElementById('endereco').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
        });
});


function formatarCPF(cpf) {
    // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
  
    // Adiciona os pontos e traços no formato do CPF
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  
    return cpf;
  }

  // Exemplo de uso:
const inputCPF = document.getElementById('cpf');
inputCPF.addEventListener('input', function () {
  this.value = formatarCPF(this.value);
});


/* Função para atualizar o ano no rodapé */
  const anoAtualElement = document.getElementById('anoAtual');
  const anoAtual = new Date().getFullYear();
  anoAtualElement.textContent = anoAtual;
