document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
        <nav class="cadastrologin">
            <a href="/cadastro">Cadastre-se</a>
            <a href="/login">Login</a>
            
        </nav>
        <div class="logo">
            <a href="/"><img id="logo" src="images/logo2.png" alt="Casa Cidadã"></a>
        </div>
        <nav class="menusuperior">
            <ul>
                <li><a href="/adm">Administrador</a></li>
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
            </ul>
        </nav>

        <footer>
            <p>&copy; 2024 Casa Cidadã.<br>Todos os direitos reservados.</p>
        </footer>
    `;
    document.getElementById("cabeçalho").innerHTML = headerHTML;

});
