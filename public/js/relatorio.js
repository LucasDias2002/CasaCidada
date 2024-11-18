const form_parceiro = document.getElementById("form-relatorio");

form_parceiro.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("mes").value;
    const email = document.getElementById("despesas").value;
    const tipo = document.getElementById("saldo").value;
    const cnpj = document.getElementById("descricao").value;

    console.log(mes, despesas, saldo, descricao);

    try {
        const response = await fetch("/relatorio", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mes, despesas, saldo, descricao })
        });
        if (response.ok) {
            alert('Relatório adicionado com sucesso!');
            form_parceiro.reset();
        } else {
            alert('Erro ao cadastrar relatório. Tente novamente.');
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
