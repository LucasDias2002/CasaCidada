new Swiper('.card-wrapper', {
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
  

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      0:{
        slidesPerView: 1,
        spaceBetween: 0
      },
      640: {
          slidesPerView: 1,
          spaceBetween: 10
      },
      768: {
          slidesPerView: 2,
          spaceBetween: 20
      },
      1024: {
          slidesPerView: 3,
          spaceBetween: 30
      }
  }
  });