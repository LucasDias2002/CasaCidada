const form_parceiro = document.getElementById("form-parceiro");

form_parceiro.addEventListener("submit", async (event) => {
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
            body: JSON.stringify({ nome, email, tipo, cnpj, area_atuacao, telefone, cep, numero })
        });
        if (response.ok) {
            alert('Parceiro cadastrado com sucesso!');
            form_parceiro.reset();
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
excluirParceiros.addEventListener("click", async () => {
    try {
        const response = await fetch("/parceiro", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const parceiros = await response.json();
            console.log(parceiros.length);
            let parceiroCard = "";
            for (let i = 0; i < parceiros.length; i++) {
                parc = parceiros[i];
                parceiroCard += `<tr>
                            <td>${parc.NOME}</td>
                            <td>${parc.EMAIL}</td>
                            <td>${parc.TELEFONE}</td>
                            <td>${parc.AREA_ATUACAO}</td>
                            <td><button type="button" onclick="ApagarParceiro(${parc.ID})" class="btn btn-danger">Apagar</button></td>
                </tr>`;
            }
            document.getElementById("parceiros").innerHTML = parceiroCard;
        }
        else {
            console.log('Erro ao carregar usuários. Tente novamente.');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao conectar ao servidor.');
    }
}
);

async function ApagarParceiro(id){
    try {
        const response = await fetch(`/parceiro/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            alert(`PARCEIRO ${id} foi apagado!`)
            location.href = "adm.html";
        }
        else {
            console.log('Erro ao apagar parceiro. Tente novamente.');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao conectar ao servidor.');
    }
}
;
