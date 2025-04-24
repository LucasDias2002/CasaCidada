document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/parceiro", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const parceiros = await response.json();
            let str = "";
            document.getElementById('parceiros-container');

            for (let i = 0; i < parceiros.length; i++) {
                let parc = parceiros[i];
                str += `<div class="card-parceiro">
                    <h4>${parc.nome}</h4>
                    <p><strong>Área de Atuação:</strong>${parc.area_atuacao}</p>
                    <img style="width: 150px" src="${parc.imagem}" alt="Logo">
                    <p><strong>Contato:</strong>${parc.email}</p>
                </div>`;
            }
            console.log(str)
            document.getElementById('parceiros-container').innerHTML = str;
        }
        else {
            console.log('Erro ao carregar parceiros. Tente novamente.');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
    }
})