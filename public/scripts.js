document.addEventListener("DOMContentLoaded", function () {
    let headerHTML = ``;

    headerHTML += `
        <div class="logo">
            <a href="/"><img id="logo" src="images/logo2.png" alt="Casa Cidadã"></a>
        </div>
        <nav class="menusuperior">
            <ul>
                <li><a href="/">Página Inicial</a></li>
                <li><a href="/quemsomos">Quem Somos</a></li>
                <li><a href="/aluguelsolidario">Aluguel Solidário</a></li>
                <li><a href="/parceiros">Parceiros</a></li>
                <li><a href="/transparencia">Transparência</a></li>
                <li><a href="/assistidos">Assistidos</a></li>
                <li><a href="/fotos">Fotos</a></li>
                <li><a href="/poprua">PopRua em BH</a></li>
                <li><a href="/housingfirst">Housing First</a></li>
                <li><a href="/doeagora">Doe Agora</a></li>
                <li><a href="/contato">Contato</a></li>
    `;

    // Verifica se o usuário está logado e possui permissão
    const token = BuscarCookie("userToken");
    if (token && VerificarPermissao(token) === 1) {
        headerHTML += `<li><a href="/adm" class="branco">Área de Gestão</a></li>`;
    }
    if (token){
        headerHTML += `
    <li><a href="/" class="branco">Meu Perfil</a></li>
    <li><a href="#" class="branco" id="logout">Sair</a></li>`;
    }
    else{
        headerHTML += `
    <li><a href="/login" class="branco">Login</a></li>`;
    }

    headerHTML += `
        </ul>
        </nav>
        <footer>
            <p>&copy; 2024 Casa Cidadã.<br>Todos os direitos reservados.</p>
        </footer>
    `;

    document.getElementById("cabeçalho").innerHTML = headerHTML;

    document.getElementById('logout').addEventListener('click', function(event) {
        event.preventDefault();
    
        fetch('/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          window.location.href = '/login';
        })
        .catch(error => {
          console.error('Erro ao fazer logout:', error);
        });
      });
});

function BuscarCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function DecodificarJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Erro ao decodificar o token:", e);
        return null;
    }
}

function VerificarPermissao(token) {
    const payload = DecodificarJWT(token);
    if (payload && payload.permissao)
        return parseInt(payload.permissao, 10);

    return null;
}