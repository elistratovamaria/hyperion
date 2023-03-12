/* Menu */

const navMain = document.querySelector('.main-nav__wrapper');
const navToggle = document.querySelector('.main-nav__toggle');

navToggle.addEventListener('click', () => {
  navMain.classList.toggle('main-nav__wrapper--opened');
});
