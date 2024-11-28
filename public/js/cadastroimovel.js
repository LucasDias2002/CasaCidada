const imovelform = document.getElementById('imovelform');

imovelform.addEventListener('submit', async (event) => {
    event.preventDefault();//Parar e reiniciar um saco;

    const endereco = document.getElementById('imovelendereco').value;
    const cep = document.getElementById('imovelcep').value;
    const complemento = 'casa';
    const num_residencia = document.getElementById('imovelnumero').value;
    const nome_proprietario = document.getElementById('imovelproprietario').value;
    const telefone = document.getElementById('imovelcontato').value;
    const descricao = document.getElementById('imoveldescricao').value;
    const status = document.getElementById('status').value;

    //console.log(telefone, num_residencia);

    try {

        const resposta = await fetch('/imovel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cep, endereco, complemento, num_residencia, nome_proprietario, telefone, descricao, status })
        })
        if (resposta.ok) {
            alert("cadastro sucedido");
            imovelform.reset();
            trocarDiv('cadastrar-imovel','ver-imoveis');
            CarregarImoveis();
        } else {
            alert("Erro ao cadastrar");
        }
    } catch (erro) {
        console.error("erro ao cadastrar imovel arquivo 'cadatroimovel.js': " + erro);
    }
});


//Puxar imoveis para tabela
async function CarregarImoveis(){
    try {

        const resposta = await fetch('/imovel', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            const imoveis = await resposta.json();
            const tabela = document.getElementById('tabela-imoveis');
            tabela.innerHTML = '';
            //console.log(imoveis.STATUS);
            imoveis.forEach(imovel => {
                const linha = document.createElement('tr');

                linha.innerHTML = `<td>${imovel.CEP}</td>
                                <td>${imovel.NUM_RESIDENCIA}</td>
                                <td>${imovel.ENDERECO}</td>
                                <td>${imovel.NOME_PROPRIETARIO}</td>
                                <td>${imovel.TELEFONE}</td>
                                <td>${imovel.DESCRICAO}</td>
                                <td>${imovel.STATUS}</td>
                                <td>
                                    <button type="button" onclick="DeletarImovel(${imovel.ID})" class="btn-delete"><img src="./images/excluir.png" style="width: 20px"> </button>
                                    <button type="button" onclick="EditarImovel(${imovel.ID})" class="btn-edit"><img src="./images/editar.png" style="width: 20px"></button>
                                </td>`;
                tabela.appendChild(linha);
            });

        } else {
            alert("Erro buscar imovel");
        }
    } catch (erro) {
        console.error("erro ao Buscar imoveis 'cadatroimovel.js': " + erro.message);
    }
};

if(window.getComputedStyle(document.getElementById('ver-imoveis')).display === 'block'){
    CarregarImoveis();
}



//EditarImovel

async function EditarImovel(idImovel) {
    //funcão para alterar visibilidade passando duas divs, da 1° para a segunda 2°
    document.getElementById('ver-imoveis').style.display= "none";
    document.getElementById('editar-imovel').style.display= "block";

    console.log(idImovel)
    try {

        const resposta = await fetch(`/imovel/${idImovel}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //console.log(resposta)
        if (resposta.ok) {
            const imovel = await resposta.json();
            console.log(imovel.ID)
            document.getElementById('editarimovelendereco').value = imovel.ENDERECO;
            document.getElementById('editarimovelcep').value = imovel.CEP;
            document.getElementById('editarimovelnumero').value = imovel.NUM_RESIDENCIA;
            document.getElementById('editarimovelproprietario').value = imovel.NOME_PROPRIETARIO;
            document.getElementById('editarimovelcontato').value = imovel.TELEFONE;
            document.getElementById('editarimoveldescricao').value = imovel.DESCRICAO;
            document.getElementById('status').value = imovel.STATUS;
            document.getElementById('idImovel').value = imovel.ID;

        } else {
            alert("Erro ao deletar");
        }
    } catch (erro) {
        console.error("erro ao deletar imovel arquivo 'cadatroimovel.js': " + erro);
    }
}

//deletar usuario
async function DeletarImovel(idImovel) {
    try {

        const resposta = await fetch(`/imovel/${idImovel}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            alert("Delete concluido");
            CarregarImoveis();
        } else {
            alert("Erro ao deletar");
        }
    } catch (erro) {
        console.error("erro ao deletar imovel arquivo 'cadatroimovel.js': " + erro);
    }
};



document.getElementById("editarimovelform").addEventListener("submit", async (evt) => {
    evt.preventDefault();

    // Coleta os dados do formulário de edição
    const endereco = document.getElementById('editarimovelendereco').value;
    const cep = document.getElementById('editarimovelcep').value;
    const num_residencia = document.getElementById('editarimovelnumero').value;
    const complemento = 'casa';
    const nome_proprietario = document.getElementById('editarimovelproprietario').value;
    const telefone = document.getElementById('editarimovelcontato').value;
    const descricao = document.getElementById('editarimoveldescricao').value;
    const status = document.getElementById('editarstatus').value;
    const idImovel = document.getElementById('idImovel').value;

    try {
        const response = await fetch(`/imovel/${idImovel}`, { // Usando o idImovel aqui
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cep, complemento, endereco, num_residencia, nome_proprietario, telefone, status, descricao, idImovel })
            //imovel.cep,imovel.complemento,imovel.endereco,imovel.num_residencia,imovel.nome_proprietario,imovel.telefone,imovel.status,imovel.descricao,id
        });

        if (response.ok) {
            alert(`Imóvel de ${nome_proprietario} atualizado com sucesso!`);
            document.getElementById("editarimovelform").reset();
            // Aqui você pode atualizar a tabela ou esconder o formulário de edição
            //funcão para alterar visibilidade passando duas divs, da 1° para a segunda 2°

            trocarDiv('editar-imovel','ver-imoveis');
            CarregarImoveis();
        } else {
            alert('Erro ao atualizar o imóvel.');
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao conectar ao servidor.');
    }
});


function trocarDiv(div1, div2) {
    document.getElementById(div1).style.display= "none";
    document.getElementById(div2).style.display= "block";
}