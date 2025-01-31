const cadastrarAssistido = document.getElementById('cadastrar-assistido');

cadastrarAssistido.addEventListener('submit', async (event) => {
    event.preventDefault();//Parar e reiniciar um saco;

    const nome = document.getElementById('assistido-nome').value;
    const cpf = document.getElementById('assistido-cpf').value;
    const data_nasc = document.getElementById('assistido-data-nasc').value;
    const telefone = document.getElementById('assistido-telefone').value;
    const id_imovel = document.getElementById('escolherimovel').value;
    const imagemAssistido = document.getElementById("uploadAssistido").files[0]; //isso e pra pegar as image tlgd
    //Puxar a data de cadastro
    const dataAtual = new Date();
    let ano = dataAtual.getFullYear();
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    let dia = String(dataAtual.getDate()).padStart(2, '0');
    const data_cadastro = `${ano}-${mes}-${dia}`;


    //Isso é usado pra juntar os arquivos
    const formData = new FormData();
    const preencherFormData = () => {
        formData.append("nome", nome);
        formData.append("cpf", cpf);
        formData.append("data_nasc", data_nasc);
        formData.append("telefone", telefone);
        formData.append("data_cadastro", data_cadastro);
        if (id_imovel != -1) formData.append("id_imovel", id_imovel);//Caso o Carlos nao quiser colocar um imovel relacionado ao assistido
        formData.append("imagem", imagemAssistido);
    };
    preencherFormData();
    try {
        const resposta = await fetch('/assistido', {
            method: 'POST',
            body: formData
        })

        if (resposta.ok) {
            alert("cadastro sucedido");
            cadastrarAssistido.reset();

            if (id_imovel != -1) {
                await AlterarDisponibilizacaoDeImovel(id_imovel);
            }
            trocarDiv('adc-assistido', 'ver-assistidos');
            CarregarAssistidos();
            CarregarImoveis();
        } else {
            alert("Erro ao cadastrar");
        }
    } catch (erro) {
        console.error("erro ao cadastrar imovel arquivo 'cadatroimovel.js': " + erro);
    }
});

async function AlterarDisponibilizacaoDeImovel(idImovel) {
    try {
        const response = await fetch(`/imovel/atualizarStatus/${idImovel}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Disponibilidade alterada')
        } else {
            alert('Erro ao atualizar o imóvel.');
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Erro ao conectar ao servidor.');
    }
}

async function CarregarAssistidos() {
    try {
        const resposta = await fetch('/assistido', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            const assistidos = await resposta.json();
            const tabela = document.getElementById('tabela-assistidos');
            tabela.innerHTML = '';
            assistidos.forEach(assistido => {
                const linha = document.createElement('tr');

                //Formatar as datas
                const data = new Date(assistido.data_nasc);
                const dia = String(data.getDate()).padStart(2, '0');
                const mes = String(data.getMonth() + 1).padStart(2, '0');
                const ano = String(data.getFullYear());
                const DATA_NASC = `${dia}/${mes}/${ano}`;

                linha.innerHTML = `
                        <td><img src="/images/fotosAssistidos/${assistido.nome}.png" style="width: 6.771vw; border-radius: 5.208vw; height: 6.771vw" alt=""></td>
                        <td>${assistido.nome}</td>
                        <td>${assistido.cpf}</td>
                        <td>${assistido.telefone}</td>
                        <td>${DATA_NASC}</td>
                        <td>${assistido.id_imovel == null ? "Sem imovel" : `${assistido.endereco} ${assistido.num_residencia}, ${assistido.bairro}, ${assistido.complemento}`}</td>
                        <td>
                            <button type="button" onclick="DeletarAssistido(${assistido.id})" class="btn-delete"><img src="./images/excluir.png" style="width: 20px"> </button>
                            <button type="button" id="btn-editar-assistido" onclick="EditarAssistido(${assistido.id})" class="btn-edit"><img src="./images/editar.png" style="width: 20px"></button>
                        </td>`;
                tabela.appendChild(linha);
            });
            document.getElementById('adicionarAssistido').addEventListener('click', async () => {
                await PuxarImoveisDisponiveis('escolherimovel');
            });
        } else {
            alert("Erro buscar Assistido");
        }
    } catch (erro) {
        console.error("erro ao Buscar Assistido: " + erro.message);
    }
};
//Funcao que 

if (window.getComputedStyle(document.getElementById('ver-assistidos')).display === 'block') {
    CarregarAssistidos();
};

async function PuxarImoveisDisponiveis(select_id, imovel_id) {
    try {
        // Fetch imóveis disponíveis
        const resposta = await fetch('/imovel/disponiveis', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!resposta.ok) throw new Error("Erro ao buscar imóveis disponíveis.");

        const imoveisDisponiveis = await resposta.json();
        const select = document.getElementById(select_id);
        select.innerHTML = ''; // Limpa opções existentes

        // Caso tenha um imóvel vinculado
        if (imovel_id && imovel_id != -1) {
            let imovelEmUso;
            try {
                const respostaImovel = await fetch(`/imovel/${imovel_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!respostaImovel.ok) throw new Error("Erro ao buscar imóvel por ID.");
                imovelEmUso = await respostaImovel.json();

                // Adiciona o imóvel em uso como opção
                const option = document.createElement('option');
                option.value = imovel_id;
                option.textContent = `${imovelEmUso.endereco} ${imovelEmUso.num_residencia}, ${imovelEmUso.bairro}, ${imovelEmUso.complemento}`;
                select.appendChild(option);
            } catch (erro) {
                console.error("Erro ao buscar imóvel por ID:", erro.message);
            }
        }

        // Adiciona uma opção padrão para "sem imóvel"
        const optionPadrao = document.createElement('option');
        optionPadrao.value = -1;
        optionPadrao.textContent = 'Sem imóvel';
        select.appendChild(optionPadrao);

        // Adiciona imóveis disponíveis
        imoveisDisponiveis.forEach(imovel => {
            if (imovel.id != imovel_id) {
                const option = document.createElement('option');
                option.value = imovel.id;
                option.textContent = `${imovel.endereco} ${imovel.num_residencia}, ${imovel.bairro}, ${imovel.complemento}`;
                select.appendChild(option);
            }
        });
    } catch (erro) {
        console.error("Erro ao buscar imóveis disponíveis:", erro.message);
    }
}


async function DeletarAssistido(id_assistido) {
    try {

        const resposta = await fetch(`/assistido/${id_assistido}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            alert("Delete concluido");
            CarregarAssistidos();
        } else {
            alert("Erro ao deletar");
        }
    } catch (erro) {
        console.error("erro ao deletar Assistido arquivo: " + erro);
    }
};

async function EditarAssistido(id_assistido) {
    //funcão para alterar visibilidade passando duas divs, da 1° para a segunda 2°
    trocarDiv('ver-assistidos', 'editar-assistido');

    try {

        const resposta = await fetch(`/assistido/${id_assistido}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (resposta.ok) {
            const assistido = await resposta.json();

            //Formatar as datas
            const data_nasc = new Date(assistido.data_nasc);
            const dia = String(data_nasc.getDate()).padStart(2, '0');
            const mes = String(data_nasc.getMonth() + 1).padStart(2, '0');
            const ano = String(data_nasc.getFullYear());
            const DATA_NASC = `${ano}-${mes}-${dia}`;

            document.getElementById('editar-assistido-nome').value = assistido.nome;
            document.getElementById('editar-assistido-cpf').value = assistido.cpf;
            document.getElementById('editar-assistido-telefone').value = assistido.telefone;
            document.getElementById('editar-assistido-data-nasc').value = DATA_NASC;
            await PuxarImoveisDisponiveis('editar-escolherimovel', assistido.id_imovel);

        } else {
            alert("Erro ao deletar");
        }
    } catch (erro) {
        console.error("erro ao buscar assistido: " + erro);
    };

    if (document.getElementById("editar-assistido").addEventListener("submit", async (evt) => {
        evt.preventDefault();
        const nome = document.getElementById('editar-assistido-nome').value;
        const cpf = document.getElementById('editar-assistido-cpf').value;
        const telefone = document.getElementById('editar-assistido-telefone').value;
        const data_nasc = document.getElementById('editar-assistido-data-nasc').value;
        const id_imovel = document.getElementById('editar-escolherimovel').value;

        //Puxando id do imovel



        let body = {};
        if (id_imovel == -1)
            body = { nome, cpf, telefone, data_nasc }
        else
            body = { nome, cpf, telefone, data_nasc, id_imovel }

        try {
            const response = await fetch(`/assistido/${id_assistido}`, { // Usando o idAssistido aqui
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                CarregarAssistidos();
                trocarDiv('editar-assistido', 'ver-assistidos');//funcão para alterar visibilidade passando duas divs, da 1° para a segunda 2°
            } else {
                alert('Erro ao atualizar o imóvel.');
            }
        } catch (erro) {
            console.error('Erro na requisição:', erro);
            alert('Erro ao conectar ao servidor.');
        }
    }));
};


function trocarDiv(div1, div2) {
    document.getElementById(div1).style.display = "none";
    document.getElementById(div2).style.display = "block";
};