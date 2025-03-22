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

            const card = document.getElementById("list-news");
            card.innerHTML ="";
            console.log(noticias)
            noticias.forEach(noticia => {
                let data = formataData(noticia.data_publicacao)
                card.innerHTML += 
                `<li class="card-item card-menor"><a class="card-link card-link-menor" href="noticia.html?noticia=${noticia.id}">
                                    <img src="/images/noticias/${noticia.titulo}" class="card-image">
                                    <p class="badge">${data}</p>
                                    <h2 class="card-titulo">${noticia.titulo}</h2>
                                    <button class="card-button material-symbols-rounded">arrow_forward</button>
                                </a></li>`;
                                console.log(data)
            });
        } else {
            alert("Erro buscar notícias");
        }
    } catch (erro) {
        console.error("erro ao buscar noticias: " + erro.message);
    }
})

function formataData(data) {
    const dataObj = new Date(data); // Renomeando a variável para evitar conflito
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = String(dataObj.getFullYear());
    return `${dia}/${mes}/${ano}`;
}