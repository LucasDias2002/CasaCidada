document.addEventListener('DOMContentLoaded', async (event) => {

    const urlParams = new URLSearchParams(window.location.search);

    const noticiaId = urlParams.get('noticia');

    try {

        const resposta = await fetch(`/noticia/${noticiaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (resposta.ok) {
            const noticia = await resposta.json();
            console.log(noticia)
            let card = document.getElementById('card-news');

            card.innerHTML = "";

            card.innerHTML = `<div class="section">
            <h1 id="titulo-noticia">${noticia.titulo}</h1>
            <p id="data">${formataData(noticia.data_publicacao)} - Casa Cidadã</p>
            <div class="img">
                <img id="banner" src="../images/noticias/${noticia.titulo}" alt="">
            </div>
            <div id="conteudo">
                <p id="conteudo">${noticia.descricao}</p>
            </div>
        </div>`;


        } else {
            console.log("Erro ao encontrar a notícia!");
        }
    } catch (erro) {
        console.error("erro encontrar a notícia': " + erro);
    }
});

function formataData(data) {
    const dataObj = new Date(data); // Renomeando a variável para evitar conflito
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = String(dataObj.getFullYear());
    return `${dia}/${mes}/${ano}`;
}