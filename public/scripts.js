document.addEventListener("DOMContentLoaded", function () {
    let navbar = ``;
    navbar += `
        <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
            <img id="logo" src="images/logo2.png" alt="Casa Cidadã" height="50">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><i class="bi bi-list"></i></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                <li class="nav-item mx-3"><a class="nav-link" href="/">Página Inicial</a></li>
                <li class="nav-item mx-3"><a class="nav-link" href="/quemsomos">Quem Somos</a></li>
                
                <!-- Dropdown Saiba Mais -->
                <li class="nav-item dropdown mx-3">
                    <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Saiba Mais
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown" style="background-color: white;">
                        <li><a class="dropdown-item" href="/aluguelsolidario" style="color: #a30336;">Aluguel Solidário</a></li>
                        <li><a class="dropdown-item" href="/parceiros" style="color: #a30336;">Parceiros</a></li>
                        <li><a class="dropdown-item" href="/poprua" style="color: #a30336;">PopRua em BH</a></li>
                        <li><a class="dropdown-item" href="/housingfirst" style="color: #a30336;">Housing First</a></li>
                        <li><a class="dropdown-item" href="/transparencia" style="color: #a30336;">Transparência</a></li>
                        <li><a class="dropdown-item" href="/assistidos" style="color: #a30336;">Assistidos</a></li>
                        <li><a class="dropdown-item" href="/fotos" style="color: #a30336;">Fotos</a></li>
                    </ul>
                </li>
                
                <li class="nav-item mx-3"><a class="nav-link" href="/doeagora">Doe Agora</a></li>
                <li class="nav-item mx-3"><a class="nav-link" href="/contato">Contato</a></li>
            </ul>`;

        // Verifica se o usuário está logado e possui permissão
        const token = BuscarCookie("userToken");
        if (token && VerificarPermissao(token) === 1) {
            navbar += `<li><a href="/adm" class="branco">Área de Gestão</a></li>`;
        }
        if (token){
            navbar += `
            <li><a href="/" class="branco">Meu Perfil</a></li>
            <li><a href="#" class="branco" id="logout">Sair</a></li>`;
        }
        else{
            navbar += `
            <li><a href="/login" class="login-btn ms-auto">Área do Gestor</a></li>`;
        }
    
        navbar += `
            </ul> </div> </div>
            </nav>
        `;

        // FOOTER 
        let footer = `<div class="container d-xl-flex justify-content-center">
            <section class="d-flex flex-column py-5 ">
                <div class="d-flex">
                    <img src="./images/logoBranca.png" alt="logo" width="300px">
                </div>
                <div class="d-flex justify-content-start btns">
                    <a href="https://www.instagram.com/casacidada/" class="btnI"><i class="bi bi-instagram"></i></a>
                    <a href="mailto:casacidadabh@gmail.com" class="btnI"><i class="bi bi-envelope"></i></a>
                </div>
            </section>
            <section class="d-flex flex-wrap justify-content-start py-5">
                <ul>
                    <li><h3>Sobre Nós</h3></li>
                    <li><a href="/quemsomos"><p>Quem somos</p></a></li>
                    <li><a href="/transparencia"><p>Transparência</p></a></li>
                    <li><a href="/parceiros"><p>Parceiros</p></a></li>
                    <li><a href="/assistidos"><p>Assistidos</p></a></li>
                    <li><a href="/contato"><p>Contato</p></a></li>
                </ul>
                <ul>
                    <li><h3>Conteúdos</h3></li>
                    <li><a href="noticias.html"><p>Notícias</p></a></li>
                    <li><a href="/fotos"><p>Fotos</p></a></li>
                </ul>
                <ul>
                    <li><h3>Unidade</h3></li>
                    <li><a href="https://www.google.com/maps/place/R.+Manhumirim,+813+-+Padre+Eust%C3%A1quio,+Belo+Horizonte+-+MG,+30770-190/data=!4m2!3m1!1s0xa6973a8dd8369b:0x645074e446139d79?sa=X&ved=1t:242&ictx=111"><p>Casa Cidadã - Padre Eustáquio</p></a></li>
                </ul>
               
            </section>
        </div>`;
        document.getElementById("navbar").innerHTML = navbar;
        document.getElementById("footer").innerHTML = footer;

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

// BOTÕES CALL TO ACTION
document.addEventListener("DOMContentLoaded", function () {
    const botoesCtaDiv = document.getElementById("botoes-cta");

    // PENSANDO EM COLOCAR O LINK DO WHATSAPP NO BOTÃO "SEJA VOLUNTÁRIO" ~~Melissa
    if (botoesCtaDiv) {
        botoesCtaDiv.innerHTML = `
            <a href="doacao.html" class="cta">Doe Agora</a>
            <a href="voluntario.html" class="cta">Seja Voluntário</a>
        `;
    }
});