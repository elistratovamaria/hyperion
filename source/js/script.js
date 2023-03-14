/* Menu */

const navMain = document.querySelector('.main-nav__wrapper');
const navToggle = document.querySelector('.main-nav__toggle');

navToggle.addEventListener('click', () => {
  navMain.classList.toggle('main-nav__wrapper--opened');
  navToggle.classList.toggle('main-nav__toggle--opened');
});

/* Slider construction */

const swiperConstruction = new Swiper('.construction__slider', {
  navigation: {
    nextEl: '.construction__button--next',
    prevEl: '.construction__button--prev',
  },
  slidesPerView: 1,
  slideToClickedSlide: true,
  thumbs: {
    swiper: {
      el: '.construction__mini-slider',
      breakpoints: {
        375: {
          slidesPerView: 'auto',
          spaceBetween: 4,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 16,
        }
      }
    }
  }
});

/* Slider montage */

const swiperMontage = new Swiper('.montage__slider', {
  navigation: {
    nextEl: '.montage__button--next',
    prevEl: '.montage__button--prev',
  },
  slidesPerView: 1,
  slideToClickedSlide: true,
  thumbs: {
    swiper: {
      el: '.montage__mini-slider',
      breakpoints: {
        375: {
          slidesPerView: 'auto',
          spaceBetween: 4,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 16,
        }
      }
    }
  }
});

