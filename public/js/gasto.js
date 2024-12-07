const form_gasto = document.getElementById("gastoform");

form_gasto.addEventListener("submit", async (event) => {
    event.preventDefault();

    const valor = document.getElementById("valorgasto").value;
    const data_gasto = document.getElementById("datagasto").value;
    const descricao = document.getElementById("descricaogasto").value;

    try {
        const response = await fetch("/gasto", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ valor, data_gasto, descricao })
        });
        if (response.ok) {
            form_gasto.reset();
            trocarDiv('adc-gasto', 'ver-gastos');
            CarregarGastos();
        } else {
            alert('Erro ao cadastrar gasto. Tente novamente.');
        }
    }
    catch (error) {
        console.error('Erro na requisição:', error);
    }
})

async function CarregarGastos() {
    try {

        const resposta = await fetch('/gasto', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            const gastos = await resposta.json();
            let str = "";

            for (let i = 0; i < gastos.length; i++) {
                let gasto = gastos[i];
                let data = formatarData(gasto.DATA_GASTO)
                str += `<tr><td>R$ ${gasto.VALOR}</td>
                                <td>${data}</td>
                                <td>${gasto.DESCRICAO}</td>
                                <td>
                                    <button type="button" onclick="DeletarGasto(${gasto.ID})" class="btn-delete"><img src="./images/excluir.png" style="width: 20px"></button>
                                </td></tr>`;
            }
            document.getElementById("tabela-gastos").innerHTML = str;
        }

        else {
            alert("Erro buscar recebimentos");
        }
    } catch (erro) {
        console.error("erro ao buscar Recebimentos: " + erro.message);
    }
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


if (window.getComputedStyle(document.getElementById('ver-gastos')).display === 'block') {
    CarregarGastos();
}

async function DeletarGasto(idGasto) {
    const conf = confirm("Deseja deletar esse gasto?");
    if (conf) {
        try {

            const resposta = await fetch(`/gasto/${idGasto}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (resposta.ok) {
                CarregarGastos();
            } else {
                console.log("Erro ao deletar gasto");
            }
        } catch (erro) {
            console.error("erro ao deletar gasto: " + erro);
        }
    }
};

function trocarDiv(div1, div2) {
    document.getElementById(div1).style.display = "none";
    document.getElementById(div2).style.display = "block";
}