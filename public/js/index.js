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
            
            noticias.forEach(noticia => {
                let data = formataData(noticia.data_publicacao)
                card.innerHTML += 
                `<li class="card-item swiper-slide"><a class="card-link" href="noticia.html?noticia=${noticia.id}">
                                    <img src="${location.href}${noticia.imagem}" class="card-image">
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
    try {
        const resposta = await fetch('/depoimento', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (resposta.ok) {
            const dep = await resposta.json();
            if (dep.length == 0)
                document.getElementById("depo").innerHTML = "<-- NÃO HÁ DEPOIMENTOS! -->";
            else {
                let str = "";
                dep.reverse();
                for (let i = 0; i < dep.length; i++) {
                    depoimento = dep[i];
                    str += `<div class="depoimento">
                <p>★★★★★</p>
                <blockquote>“${depoimento.depoimento}”</blockquote>
                <h5><i>— ${depoimento.nome}</i></h5>
            </div> `;
                }
                document.getElementById("depo").innerHTML = str;
            }

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