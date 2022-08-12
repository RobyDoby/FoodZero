const swiper = new Swiper('.swiper', {
   // Optional parameters
   direction: 'horizontal',
   loop: true,
   speed: 400,
   spaceBetween: 100,

   // If we need pagination
   pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
   },

   // Navigation arrows
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
});
