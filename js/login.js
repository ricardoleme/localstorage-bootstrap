function validaLogin(event){
        event.preventDefault();

        // Obtém os valores do usuário e senha informados
        let email = btoa(document.getElementById("email").value)
        let senha = btoa(document.getElementById("senha").value)
        
        console.log(btoa('aluno@fatecitu.edu.br'))
        // Compara os valores informados com os armazenados
        if (email === 'YWx1bm9AZmF0ZWNpdHUuZWR1LmJy' && senha === 'MTIzNDU=') {            
            // Redireciona para a página clientes.html após o login bem-sucedido
            window.location.href = "clientes.html";
        } else {
            alert("Usuário ou senha incorretos.");
        }
    }
