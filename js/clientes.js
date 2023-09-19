// Função para sallet os dados do formulário no LocalStorage
function salvarCliente() {
    // Obtenha os dados do formulário
    let cpf = document.getElementById("cpf").value;
    let nome = document.getElementById("nome").value;
    let cep = document.getElementById("cep").value;
    let endereco = document.getElementById("endereco").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;
    let observacoes = document.getElementById("observacoes").value;
  
    // Verifique se o LocalStorage já contém dados de clientes
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  
    // Crie um objeto com os dados do cliente
    let cliente = {
      cpf: cpf,
      nome: nome,
      cep: cep,
      endereco: endereco,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      observacoes: observacoes,
    };
  
    // Adicione o cliente à lista de clientes
    clientes.push(cliente);
  
    // Salve a lista atualizada no LocalStorage
    localStorage.setItem("clientes", JSON.stringify(clientes));
  
    // Limpe o formulário
    document.getElementById("cpf").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("observacoes").value = "";
  
    // Atualize a tabela de listagem
    listarClientes();
  }
  
 // Função para listar os dados dos clientes na tabela
function listarClientes() {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let tabela = document.getElementById("listagem");
  
    // Limpe a tabela
    tabela.innerHTML = "";
  
    // Crie uma tabela HTML
    let table = document.createElement("table");
    table.className = "table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>CPF</th>
          <th>Nome</th>
          <th>CEP</th>
          <th>Endereço</th>
          <th>Bairro</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Observações</th>
          <th>Ações</th> <!-- Adicione uma coluna para as ações -->
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;
  
    // Preencha a tabela com os dados dos clientes
    let tbody = table.querySelector("tbody");
    for (let i = 0; i < clientes.length; i++) {
      let cliente = clientes[i];
      let row = tbody.insertRow(i);
      row.innerHTML = `
        <td>${cliente.cpf}</td>
        <td>${cliente.nome}</td>
        <td>${cliente.cep}</td>
        <td>${cliente.endereco}</td>
        <td>${cliente.bairro}</td>
        <td>${cliente.cidade}</td>
        <td>${cliente.estado}</td>
        <td>${cliente.observacoes}</td>
        <td><button class="btn btn-danger" onclick="apagarCliente('${cliente.cpf}')">Apagar</button></td> <!-- Botão de Apagar com função onclick -->
      `;
    }
  
    tabela.appendChild(table);
  }
  
  
// Função para apagar um cliente pelo CPF
function apagarCliente(cpf) {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  
    // Filtrar a lista de clientes para remover o cliente com o CPF especificado
    clientes = clientes.filter(function (cliente) {
      return cliente.cpf !== cpf;
    });
  
    // Atualizar o LocalStorage com a nova lista de clientes
    localStorage.setItem("clientes", JSON.stringify(clientes));
  
    // Atualizar a tabela de listagem
    listarClientes();
  }
  
  // Adicione um ouvinte de eventos para o botão "Salvar"
  document.getElementById("salvar").addEventListener("click", salvarCliente);
  
  
  // Liste os clientes quando a página carregar
  listarClientes();
  

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
