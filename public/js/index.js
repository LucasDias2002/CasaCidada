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
                <td><img src="/images/noticias/${noticia.titulo}.png" style="width: 100%; height: 35.25vw" alt=""></td>
                                    <h3>${noticia.titulo}</h3>
                                    <p>${noticia.descricao}</p>
                                  </div>`;
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