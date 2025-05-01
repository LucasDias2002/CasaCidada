if(window.getComputedStyle(document.getElementById('ver-interessados')).display === 'block'){
    CarregarInteressados();
}

async function CarregarInteressados() {
    try {
        const response = await fetch("/interessado", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const interessados = await response.json();

            let str = "";
            for (let i = 0; i < interessados.length; i++) {
                user = interessados[i];
                str += `<tr>
                            <td>${user.nome}</td>
                            <td>${user.email}</td>
                </tr>`;
            }
            document.getElementById("tabela-interessados").innerHTML = str;
        }
        else {
            console.log('Erro ao carregar usuários. Tente novamente.');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
    }
}
