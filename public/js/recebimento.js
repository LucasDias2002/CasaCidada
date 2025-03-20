const form_recebimento = document.getElementById("doacaoform");

form_recebimento.addEventListener("submit", async (event) => {
    event.preventDefault();

    const valor = document.getElementById("valor").value;
    const data_recebimento = document.getElementById("data").value;
    const sigla = document.getElementById("sigla").value;

    try {
        const response = await fetch("/recebimento", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ valor, data_recebimento, sigla })
        });
        if (response.ok) {
            form_recebimento.reset();
            trocarDiv('adc-doacao', 'ver-doacoes');
            CarregarRecebimentos();
        } else {
            alert('Erro ao cadastrar doacão. Tente novamente.');
        }
    }
    catch (error) {
        console.error('Erro na requisição:', error);
    }
})

//Puxar imoveis para tabela
async function CarregarRecebimentos() {
    try {

        const resposta = await fetch('/recebimento', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            const recebimentos = await resposta.json();
            let str = "";
       
            for (let i = 0; i < recebimentos.length; i++) {
                let recebimento = recebimentos[i];
                let data = formatarData(recebimento.data_recebimento);
                str += `<tr><td>R$ ${recebimento.valor}</td>
                                <td>${data}</td>
                                <td>${recebimento.sigla_doador}</td>
                                <td>
                                    <button type="button" onclick="DeletarRecebimento(${recebimento.id})" class="btn-delete"><img src="./images/excluir.png" style="width: 20px"></button>
                                </td></tr>`;
            }
            document.getElementById("tabela-recebimentos").innerHTML = str;
        }

        else {
            alert("Erro buscar recebimentos");
        }
    } catch (erro) {
        console.error("erro ao buscar Recebimentos: " + erro.message);
    }
}

if (window.getComputedStyle(document.getElementById('ver-doacoes')).display === 'block') {
    CarregarRecebimentos();
}

async function DeletarRecebimento(idRecebimento) {
    const conf = confirm("Deseja deletar essa doação?");
    if (conf) {
        try {

            const resposta = await fetch(`/recebimento/${idRecebimento}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (resposta.ok) {
                CarregarRecebimentos();
            } else {
                console.log("Erro ao deletar doação");
            }
        } catch (erro) {
            console.error("erro ao deletar doação: " + erro);
        }
    }
};

function trocarDiv(div1, div2) {
    document.getElementById(div1).style.display = "none";
    document.getElementById(div2).style.display = "block";
}

function formatarData(date) {
    const data = new Date(date);

    // Ajustar para o fuso horário do Brasil
    const opcoes = {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };

    return new Intl.DateTimeFormat("pt-BR", opcoes).format(data);
}