const depoimentoform = document.getElementById('depoimentoform');

depoimentoform.addEventListener('submit', async (event) => {
    event.preventDefault();//Parar e reiniciar um saco;

    //Puxei de acordo com a ordem do banco de dados
    const nome = document.getElementById('nome-depoimento').value;
    const depoimento = document.getElementById('conteudo-depoimento').value;
    console.log(nome, depoimento)

    try {

        const resposta = await fetch('/depoimento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, depoimento })
        })
        if (resposta.ok) {
            depoimentoform.reset();
            trocarDiv('cadastrar-depoimento', 'ver-depoimentos');
            CarregarDepoimento();
        } else {
            alert("Erro ao cadastrar");
        }
    } catch (erro) {
        console.error("erro ao cadastrar! " + erro);
    }
});

async function CarregarDepoimento() {
    try {

        const resposta = await fetch('/depoimento', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            const depoimentos = await resposta.json();
            let str = "";
            for (let i = 0; i < depoimentos.length; i++) {
                let depoimento = depoimentos[i];
                str += `<tr>
                            <td>${depoimento.nome}</td>
                            <td>${depoimento.depoimento}</td>
                            <td>
                                <button type="button" onclick="DeletarDepoimento(${depoimento.id})" class="btn-delete"><img src="./images/excluir.png" style="width: 20px"> </button>
                                <button type="button" onclick="EditarDepoimento(${depoimento.id})" class="btn-edit"><img src="./images/editar.png" style="width: 20px"></button>
                            </td>
                </tr>`;
            }
            document.getElementById("tabela-depoimentos").innerHTML = str;
        } else {
            alert("Erro buscar imovel");
        }
    } catch (erro) {
        console.error("erro ao Buscar imoveis 'cadatroimovel.js': " + erro.message);
    }
};

if (window.getComputedStyle(document.getElementById('ver-depoimentos')).display === 'block') {
    CarregarDepoimento();
}


async function EditarDepoimento(idDepoimento) {
    //funcão para alterar visibilidade passando duas divs, da 1° para a segunda 2°
    document.getElementById('ver-depoimentos').style.display = "none";
    document.getElementById('editar-depoimento').style.display = "block";

    try {

        const resposta = await fetch(`/depoimento/${idDepoimento}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //console.log(resposta)
        if (resposta.ok) {
            const dep = await resposta.json();

            document.getElementById('id-depoimento').value = dep.id;
            document.getElementById("editar-titulo-depoimento").value = dep.nome;
            document.getElementById("editar-conteudo-depoimento").value = dep.depoimento;

        }
    } catch (erro) {
        console.error("erro ao puxar depoimento: " + erro);
    }
};

document.getElementById("editar-depoimento-form").addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const nome = document.getElementById('editar-titulo-depoimento').value;
    const depoimento = document.getElementById('editar-conteudo-depoimento').value;
    const idDepoimento = document.getElementById('id-depoimento').value;
    console.log(nome, depoimento, idDepoimento)
    try {
        const response = await fetch(`/depoimento/${idDepoimento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, depoimento })
        })

        if (response.ok) {
            document.getElementById("editar-depoimento-form").reset();
            CarregarDepoimento();
            trocarDiv('editar-depoimento', 'ver-depoimentos');
        } else {
            console.log('Erro ao atualizar o depoimento.');
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao conectar ao servidor.');
    }
});

async function DeletarDepoimento(idDepoimento) {
    const conf = confirm("Deseja deletar esse depoimento?");
    if (conf) {
        try {
            const resposta = await fetch(`/depoimento/${idDepoimento}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (resposta.ok) {
                CarregarDepoimento();
            } else {
                alert("Erro ao deletar");
            }
        } catch (erro) {
            console.error("erro ao deletar imovel arquivo 'cadatroimovel.js': " + erro);
        }
    }
};

function trocarDiv(div1, div2) {
    document.getElementById(div1).style.display = "none";
    document.getElementById(div2).style.display = "block";
};