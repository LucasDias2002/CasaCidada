const imovelform = document.getElementById('imovelform');

imovelform.addEventListener('submit', async (event) => {
    event.preventDefault();//Parar e reiniciar um saco;

    //Puxei de acordo com a ordem do banco de dados
    const cep = document.getElementById('imovelcep').value;
    const endereco = document.getElementById('imovelendereco').value;
    const bairro = document.getElementById('imovelbairro').value;
    const complemento = document.getElementById('imovelcomplemento').value;
    const num_residencia = document.getElementById('imovelnumero').value;
    const nome_proprietario = document.getElementById('imovelproprietario').value;
    const telefone = document.getElementById('imovelcontato').value;
    const valor_aluguel = parseFloat(document.getElementById('valoraluguel').value);
    const descricao = document.getElementById('imoveldescricao').value;
    const data_inicio_contrato = document.getElementById('contratoinicio').value;
    const data_termino_contrato = document.getElementById('contratofim').value;
    const status = document.getElementById('status').value;

    //console.log(`Cep:${cep}, Endereco:${endereco}, Bairro:${bairro}, Compl:${complemento}, Num_resi:${num_residencia}, Nome:${nome_proprietario}, Tel:${telefone}, Valor:${valor_aluguel}, Descricao:${descricao}, Contrato-Inicio:${contratoinicio}, Contrato-fim:${contratofim}, status:${status}` );

    try {

        const resposta = await fetch('/imovel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cep, endereco, bairro, complemento, num_residencia, nome_proprietario, telefone, valor_aluguel, descricao, data_inicio_contrato, data_termino_contrato, status })
        })
        if (resposta.ok) {
            alert("cadastro sucedido");
            imovelform.reset();
            trocarDiv('cadastrar-imovel', 'ver-imoveis');
            CarregarImoveis();
        } else {
            alert("Erro ao cadastrar");
        }
    } catch (erro) {
        console.error("erro ao cadastrar imovel arquivo 'cadatroimovel.js': " + erro);
    }
});


//Puxar imoveis para tabela
async function CarregarImoveis() {
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

                //Formatar as datas
                const datainicio = new Date(imovel.DATA_INICIO_CONTRATO);
                const dia = String(datainicio.getDate()).padStart(2, '0');
                const mes = String(datainicio.getMonth() + 1).padStart(2, '0');
                const ano = String(datainicio.getFullYear());
                const DATA_INICIO_FORMATADA = `${dia}/${mes}/${ano}`;

                const datafimcontrato = new Date(imovel.DATA_TERMINO_CONTRATO);
                const dia2 = String(datafimcontrato.getDate()).padStart(2, '0');
                const mes2 = String(datafimcontrato.getMonth() + 1).padStart(2, '0');
                const ano2 = String(datafimcontrato.getFullYear());
                const DATA_TERMINO_FORMATADA = `${dia2}/${mes2}/${ano2}`;

                linha.innerHTML = `
                    <td>${imovel.NOME_PROPRIETARIO}</td>
                        <td>${imovel.ENDERECO}, ${imovel.NUM_RESIDENCIA}, ${imovel.BAIRRO}</td>
                        <td>${imovel.COMPLEMENTO}</td>
                        <td>${imovel.CEP}</td>
                        <td>${DATA_INICIO_FORMATADA}</td>
                        <td>${DATA_TERMINO_FORMATADA}</td>
                        <td>R$${imovel.VALOR_ALUGUEL}</td>
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

if (window.getComputedStyle(document.getElementById('ver-imoveis')).display === 'block') {
    CarregarImoveis();
}



//EditarImovel

async function EditarImovel(idImovel) {
    //funcão para alterar visibilidade passando duas divs, da 1° para a segunda 2°
    document.getElementById('ver-imoveis').style.display = "none";
    document.getElementById('editar-imovel').style.display = "block";

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

            //Formatar as datas
            const datainicio = new Date(imovel.DATA_INICIO_CONTRATO);
            const dia = String(datainicio.getDate()).padStart(2, '0');
            const mes = String(datainicio.getMonth() + 1).padStart(2, '0');
            const ano = String(datainicio.getFullYear());
            const DATA_INICIO_FORMATADA = `${ano}-${mes}-${dia}`;

            const datafimcontrato = new Date(imovel.DATA_TERMINO_CONTRATO);
            const dia2 = String(datafimcontrato.getDate()).padStart(2, '0');
            const mes2 = String(datafimcontrato.getMonth() + 1).padStart(2, '0');
            const ano2 = String(datafimcontrato.getFullYear());
            const DATA_TERMINO_FORMATADA = `${ano2}-${mes2}-${dia2}`;

            document.getElementById('editarimovelcep').value = imovel.CEP;
            document.getElementById('editarimovelendereco').value = imovel.ENDERECO;
            document.getElementById('editarimovelbairro').value = imovel.BAIRRO;
            document.getElementById('editarimovelcomplemento').value = imovel.COMPLEMENTO;
            document.getElementById('editarimovelnumero').value = imovel.NUM_RESIDENCIA;
            document.getElementById('editarimovelproprietario').value = imovel.NOME_PROPRIETARIO;
            document.getElementById('editarimovelcontato').value = imovel.TELEFONE;
            document.getElementById('editarvaloraluguel').value = imovel.VALOR_ALUGUEL;
            document.getElementById('editarimoveldescricao').value = imovel.DESCRICAO;
            document.getElementById('editarcontratoinicio').value = DATA_INICIO_FORMATADA;
            document.getElementById('editarcontratofim').value = DATA_TERMINO_FORMATADA;
            document.getElementById('editarstatus').value = imovel.STATUS;
            document.getElementById('idImovel').value = imovel.ID;

        } else {
            alert("Erro ao deletar");
        }
    } catch (erro) {
        console.error("erro ao deletar imovel arquivo 'cadatroimovel.js': " + erro);
    };

    if (document.getElementById("editarimovelform").addEventListener("submit", async (evt) => {
        evt.preventDefault();
        const cep = document.getElementById('editarimovelcep').value;
        const endereco = document.getElementById('editarimovelendereco').value;
        const bairro = document.getElementById('editarimovelbairro').value;
        const complemento = document.getElementById('editarimovelcomplemento').value;
        const num_residencia = document.getElementById('editarimovelnumero').value;
        const nome_proprietario = document.getElementById('editarimovelproprietario').value;
        const telefone = document.getElementById('editarimovelcontato').value;
        const valor_aluguel = parseFloat(document.getElementById('editarvaloraluguel').value);
        const descricao = document.getElementById('editarimoveldescricao').value;
        const data_inicio_contrato = document.getElementById('editarcontratoinicio').value;
        const data_termino_contrato = document.getElementById('editarcontratofim').value;
        const status = document.getElementById('editarstatus').value;
        console.log(`Cep:${cep}, Endereco:${endereco}, Bairro:${bairro}, Compl:${complemento}, Num_resi:${num_residencia}, Nome:${nome_proprietario}, Tel:${telefone}, Valor:${valor_aluguel}, Descricao:${descricao}, Contrato-Inicio:${contratoinicio}, Contrato-fim:${contratofim}, status:${status}`);

        try {
            const response = await fetch(`/imovel/${idImovel}`, { // Usando o idImovel aqui
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cep, endereco, bairro, complemento, num_residencia, nome_proprietario, telefone, valor_aluguel, descricao, data_inicio_contrato, data_termino_contrato, status })
                //imovel.cep,imovel.complemento,imovel.endereco,imovel.num_residencia,imovel.nome_proprietario,imovel.telefone,imovel.status,imovel.descricao,id
            });

            if (response.ok) {
                //alert(`Imóvel de ${nome_proprietario} atualizado com sucesso!`);
                document.getElementById("editarimovelform").reset();
                CarregarImoveis();
                trocarDiv('editar-imovel', 'ver-imoveis');//funcão para alterar visibilidade passando duas divs, da 1° para a segunda 2°
            } else {
                alert('Erro ao atualizar o imóvel.');
            }
        } catch (erro) {
            console.error('Erro na requisição:', erro);
            alert('Erro ao conectar ao servidor.');
        }
    }));
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



// document.getElementById("editarimovelform").addEventListener("submit", async (evt) => {
//     evt.preventDefault();

//     // Coleta os dados do formulário de edição
//     const cep = document.getElementById('editarimovelcep').value;
//     const endereco = document.getElementById('editarimovelendereco').value;
//     const bairro = document.getElementById('editarimovelbairro').value;
//     const complemento = document.getElementById('editarimovelcomplemento').value;
//     const num_residencia = document.getElementById('editarimovelnumero').value;
//     const nome_proprietario = document.getElementById('editarimovelproprietario').value;
//     const telefone = document.getElementById('editarimovelcontato').value;
//     const valor_aluguel = parseFloat(document.getElementById('editarvaloraluguel').value);
//     const descricao = document.getElementById('editarimoveldescricao').value;

//     const data_inicio_contrato = document.getElementById('editarcontratoinicio').value;
//     const data_termino_contrato = document.getElementById('editarcontratofim').value;

//     const status = document.getElementById('editarstatus').value;
//     console.log(`Cep:${cep}, Endereco:${endereco}, Bairro:${bairro}, Compl:${complemento}, Num_resi:${num_residencia}, Nome:${nome_proprietario}, Tel:${telefone}, Valor:${valor_aluguel}, Descricao:${descricao}, Contrato-Inicio:${contratoinicio}, Contrato-fim:${contratofim}, status:${status}` );


//     try {
//         const response = await fetch(`/imovel/${idImovel}`, { // Usando o idImovel aqui
//             method: "PUT",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ cep, endereco, bairro, complemento, num_residencia, nome_proprietario, telefone, valor_aluguel, descricao, data_inicio_contrato, data_termino_contrato, status })
//             //imovel.cep,imovel.complemento,imovel.endereco,imovel.num_residencia,imovel.nome_proprietario,imovel.telefone,imovel.status,imovel.descricao,id
//         });

//         if (response.ok) {
//             alert(`Imóvel de ${nome_proprietario} atualizado com sucesso!`);
//             // Aqui você pode atualizar a tabela ou esconder o formulário de edição
//             //funcão para alterar visibilidade passando duas divs, da 1° para a segunda 2°
//             document.getElementById("editarimovelform").reset();
//             trocarDiv('editar-imovel', 'ver-imoveis');
//             CarregarImoveis();
//         } else {
//             alert('Erro ao atualizar o imóvel.');
//         }
//     } catch (erro) {
//         console.error('Erro na requisição:', erro);
//         alert('Erro ao conectar ao servidor.');
//     }
// });

function trocarDiv(div1, div2) {
    document.getElementById(div1).style.display = "none";
    document.getElementById(div2).style.display = "block";
};