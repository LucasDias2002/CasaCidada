document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
        <nav class="cadastrologin">
            <ul>
                <li><a href="cadastro.html">Cadastre-se</a></li>
                <li><a href="login.html">Login</a></li>
            </ul>
        </nav>
        <div class="logo">
            <a href="index.html"><img id="logo" src="images/logo2.png" alt="Casa Cidadã"></a>
        </div>
        <nav class="menusuperior">
            <ul>
                <li><a href="index.html">Página Inicial</a></li>
                <li><a href="quemsomos.html">Quem Somos</a></li>
                <li><a href="parceiros.html">Parceiros</a></li>
                <li><a href="transparencia.html">Transparência</a></li>
                <li><a href="assistidos.html">Assistidos</a></li>
                <li><a href="fotos.html">Fotos</a></li>
                <li><a href="poprua.html">PopRua em BH</a></li>
                <li><a href="housingfirst.html">Housing First</a></li>
                <li><a href="doeagora.html">Doe Agora</a></li>
                <li><a href="contato.html">Contato</a></li>
            </ul>
        </nav>
    `;
    document.getElementById("cabeçalho").innerHTML = headerHTML;
});
