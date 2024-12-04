document.addEventListener("DOMContentLoaded", async () => {
    try {

        const resposta = await fetch('/noticia', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            const noticias = await resposta.json();
            noticias.reverse();
            const card = document.getElementById("noticiascadastradas");
            card.innerHTML = '<h2>Notícias</h2>';

            noticias.forEach(noticia => {
                card.innerHTML += `<div class="noticia">
                                    <h3>${noticia.TITULO}</h3>
                                    <p>${noticia.DESCRICAO}</p>
                                  </div>`;
            });

        } else {
            alert("Erro buscar notícias");
        }
    } catch (erro) {
        console.error("erro ao buscar noticias: " + erro.message);
    }
})