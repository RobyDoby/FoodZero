const body = document.body;

const modal = document.querySelector('.modal');
const burger = document.querySelector('.modal__toggler');
const modalCloseBtn = document.querySelector('.close__btn');
const modalLinks = document.querySelector('.modal__links');

burger.addEventListener('click', (e) => {
   body.classList.add('locked');
   modal.dataset.visible = true;
});

modalCloseBtn.addEventListener('click', () => {
   body.classList.remove('locked');
   modal.dataset.visible = false;
});
window.addEventListener('keydown', (e) => {
   if (body.classList.contains('locked') && e.key === 'Escape') {
      body.classList.remove('locked');
      modal.dataset.visible = false;
   }
});
modalLinks.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal__link')) {
      body.classList.remove('locked');
      modal.dataset.visible = false;
   }
});
