const form = document.getElementById("formulario");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const data_nasc = document.getElementById("nascimento").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarsenha = document.getElementById("confirmarsenha").value;

    if (senha == confirmarsenha) {
        try {
            const response = await fetch("/usuarios", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cpf, nome, email, senha, telefone, data_nasc })
            });
            // Trata a resposta
            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
                // Opcional: Limpar os campos do formulário
                form.reset();
            } else {
                alert('Erro ao cadastrar usuário. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao conectar ao servidor.');
        }
    }
})