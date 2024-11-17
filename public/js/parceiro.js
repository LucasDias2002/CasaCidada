const form = document.getElementById("form-parceiro");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const tipo = document.getElementById("tipo").value;
    const cnpj = document.getElementById("cnpj").value;
    const area_atuacao = document.getElementById("atuacao").value;
    const telefone = document.getElementById("contato").value;
    //const descricao = document.getElementById("descricao").value;
    const cep = document.getElementById("cep").value;
    const numero = document.getElementById("numero").value;

    console.log(nome, tipo, area_atuacao, telefone, cep, numero);

    try {
        const response = await fetch("/parceiro", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome,email, tipo, cnpj, area_atuacao, telefone, cep, numero })
        });
        if (response.ok) {
            alert('Parceiro cadastrado com sucesso!');
            form.reset();
        } else {
            alert('Erro ao cadastrar parceiro. Tente novamente.');
        }
    }
    catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor.');
    }
})

const excluirParceiros = document.getElementById("btn-excluir-parceiro");
excluirParceiros.addEventListener("click", ()=>{
    
});