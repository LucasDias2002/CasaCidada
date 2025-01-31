if(window.getComputedStyle(document.getElementById('ver-usuarios')).display === 'block'){
    CarregarUsuarios();
}

async function CarregarUsuarios() {
    try {
        const response = await fetch("/usuarios", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const usuarios = await response.json();

            let str = "";
            for (let i = 0; i < usuarios.length; i++) {
                user = usuarios[i];
                str += `<tr>
                            <td>${user.nome}</td>
                            <td>${user.email}</td>
                            <td>${user.telefone}</td>
                </tr>`;
            }
            document.getElementById("tabela-usuarios").innerHTML = str;
        }
        else {
            console.log('Erro ao carregar usuários. Tente novamente.');
        }
    }
    catch (erro) {
        console.error('Erro na requisição:', erro);
    }
}
