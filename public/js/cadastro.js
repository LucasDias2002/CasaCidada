const form = document.getElementById("voluntarioform");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("emailV").value;
    const senha = document.getElementById("senha").value;
    const confirmarsenha = document.getElementById("confirmarsenha").value;

    console.log(`${email}`)

    if (senha !== confirmarsenha) {
        return alert("As senhas não coincidem.");
    }

    try {
        const response = await fetch("/usuarios", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha, telefone })
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            form.reset();
        } else {
            const erro = await response.json();
            alert(`Erro ao cadastrar: ${erro.erro || 'Erro desconhecido'}`);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor.');
    }
});
