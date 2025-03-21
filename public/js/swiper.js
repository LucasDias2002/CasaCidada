let slides;
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
      let slides = noticias.length >= 3 ? 3 : noticias.length;

      new Swiper('.card-wrapper', {
        loop: noticias.length > 1, 
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          768: {
            slidesPerView: Math.min(2, slides), 
            spaceBetween: 20
          },
          1024: {
            slidesPerView: slides, 
            spaceBetween: 30
          }
        }
      });


    } else {
      alert("Erro buscar notícias para o swiper");
    }
  } catch (erro) {
    console.error("erro ao buscar noticias para o swiper: " + erro.message);
  }

})
