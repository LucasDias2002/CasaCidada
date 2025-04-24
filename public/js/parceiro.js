const form_parceiro = document.getElementById("form-parceiro");

form_parceiro.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("parcnome").value;
    const email = document.getElementById("email").value;
    const tipo = document.getElementById("tipo").value;
    const cnpj = document.getElementById("cnpj").value;
    const area_atuacao = document.getElementById("atuacao").value;
    const telefone = document.getElementById("contato").value;
    const imagem = document.getElementById("upload").files[0];  // Pegando o arquivo de imagem

    // Criar um FormData para enviar dados do formulário e o arquivo
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("tipo", tipo);
    formData.append("cnpj", cnpj);
    formData.append("area_atuacao", area_atuacao);
    formData.append("telefone", telefone);
    formData.append("imagem", imagem);  // Adicionando o arquivo de imagem

    try {
        const response = await fetch("/parceiro", {
            method: "POST",
            body: formData // Enviando o FormData, sem o cabeçalho 'Content-Type'
        });

        if (response.ok) {
            form_parceiro.reset();
            trocarDiv("adc-parceiro", "ver-parceiro");
            CarregarParceiros();
        } else {
            alert('Erro ao cadastrar parceiro. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});


async function CarregarParceiros() {
    try {
        const response = await fetch("/parceiro", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const parceiros = await response.json();
            const tabela = document.getElementById('tabela-parceiros');
            tabela.innerHTML = "";

            parceiros.forEach(parceiro => {
                const linha = document.createElement('tr');

                linha.innerHTML = `<td><img src="${parceiro.imagem}" style="width: 6.771vw; border-radius: 5.208vw; height: 6.771vw" alt=""></td>
                                    <td>${parceiro.nome}</td>
                                    <td>${parceiro.email}</td>
                                    <td>${parceiro.telefone}</td>
                                    <td>${parceiro.tipo}</td>
                                    <td>${parceiro.cnpj}</td>
                                    <td>${parceiro.area_atuacao}</td>
                                    <td>
                                        <button type="button" onclick="ApagarParceiro(${parceiro.id})" class="btn-delete"><img src="./images/excluir.png" style="width: 20px"></button>
                                        <button type="button" onclick="EditarParceiro(${parceiro.id})" class="btn-edit"><img src="./images/editar.png" style="width: 20px"></button>
                                    </td>`;
                tabela.appendChild(linha);
            });
        }
        else {
            console.log('Erro ao carregar usuários. Tente novamente.');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
        //alert('Erro ao conectar ao servidor.');
    }
};

if (window.getComputedStyle(document.getElementById('ver-parceiro')).display === 'block') {
    CarregarParceiros();
}

async function ApagarParceiro(id) {
    const conf = confirm("Deseja deletar esse parceiro?");
    if (conf) {
        try {
            const response = await fetch(`/parceiro/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                console.log(`PARCEIRO ${id} foi apagado!`)
                CarregarParceiros();
            }
            else {
                console.log('Erro ao apagar parceiro. Tente novamente.');
            }
        }
        catch (erro) {
            console.error('Erro na requisição:', erro);
            //alert('Erro ao conectar ao servidor.');
        }
    }
}

async function EditarParceiro(id) {
    trocarDiv('ver-parceiro', 'editar-parceiro')
    try {
        const response = await fetch(`/parceiro/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const parceiro = await response.json();
            document.getElementById("editnome").value = parceiro.nome;
            document.getElementById("editemail").value = parceiro.email;
            document.getElementById("edittipo").value = parceiro.tipo;
            document.getElementById("editatuacao").value = parceiro.area_atuacao;
            document.getElementById("editcnpj").value = parceiro.cnpj;
            document.getElementById("editcontato").value = parceiro.telefone;
            document.getElementById("idParc").value = parceiro.id;
        }
        else {
            console.log('Erro ao carregar usuário. Tente novamente.');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
    }
};

document.getElementById("form-editparceiro").addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const nome = document.getElementById("editnome").value;
    const email = document.getElementById("editemail").value;
    const tipo = document.getElementById("edittipo").value;
    const area_atuacao = document.getElementById("editatuacao").value;
    const cnpj = document.getElementById("editcnpj").value;
    const telefone = document.getElementById("editcontato").value;
    const id = document.getElementById("idParc").value;

    try {
        const response = await fetch(`/parceiro/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, tipo, cnpj, area_atuacao, telefone })
        })
        if (response.ok) {
            document.getElementById("form-editparceiro").reset();
            trocarDiv("editar-parceiro", "ver-parceiro");
            CarregarParceiros();
        }
        else {
            console.log('Erro ao atualizar parceiro. Tente novamente.');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
    }
});
function trocarDiv(div1, div2) {
    document.getElementById(div1).style.display = "none";
    document.getElementById(div2).style.display = "block";
}