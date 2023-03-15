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

/* Slider buildings */

const swiperBuildings = new Swiper('.buildings__slider', {
  navigation: {
    nextEl: '.buildings__button--next',
    prevEl: '.buildings__button--prev',
  },
  slidesPerView: 1,
  slideToClickedSlide: true,
  thumbs: {
    swiper: {
      el: '.buildings__mini-slider',
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

/* Slider team */

const swiperTeam = new Swiper('.team__list', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoHeight: true,
  slidesPerView: 1,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
});

const slideElements = document.querySelectorAll('.team__item');
const imgElements = document.querySelectorAll('.team__small-item');

document.addEventListener('DOMContentLoaded', function() {
  for (let i = 0; i < imgElements.length; i++) {
    imgElements[i].dataset.imgIndex = i;
  }
}, false);

onImgClickHandler();

function onImgClickHandler() {
  imgElements.forEach((imgElement) => {
    imgElement.addEventListener('click', () => {
      const index = Number(imgElement.dataset.imgIndex);
      swiperTeam.slideTo(index);
    });
  });
}

/* Tabs */

const tabLinkElements = document.querySelectorAll('.tabs__link');
const tabContentElements = document.querySelectorAll('.tabs__content-item');

const openTabs = (evt) => {
  const buttonTarget = evt.currentTarget;
  const tabs = buttonTarget.dataset.tabs;

  tabLinkElements.forEach((tablinkElement) => {
    tablinkElement.classList.remove('is-active');
  });

  tabContentElements.forEach((tabContentElement) => {
    tabContentElement.classList.remove('is-active');
  });

  buttonTarget.classList.add('is-active');
  document.querySelector(`#${tabs}`).classList.add('is-active');
};

tabLinkElements.forEach((tabLinkElement) => tabLinkElement.addEventListener('click', openTabs));

/* Swiper destroy */

const tabsSlider = document.querySelector('.tabs__links');
const tabsContentSlider = document.querySelector('.tabs__content');
const breakpointTablet = window.matchMedia('(min-width: 768px)');

const initTabsSlider = () => {
  let sliderTabsInit;
  let sliderTabsContentInit;

  const getSlider = () => {
    if (tabsContentSlider) {
      sliderTabsContentInit = new Swiper(tabsContentSlider, {
        slidesPerView: 1,
        autoHeight: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      });
    }

    if (tabsSlider) {
      sliderTabsInit = new Swiper(tabsSlider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        grabCursor: true,
        slideToClickedSlide: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        thumbs: {
          swiper: sliderTabsContentInit,
        }
      });
    }
  }

  const breakpointChecker = () => {
    let resizeTimeout;
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        resizeHandlerTablet();
      }, 100);
    }
  };

  const resizeHandlerTablet = () => {
    if (breakpointTablet.matches === true) {
      if (sliderTabsInit !== undefined && sliderTabsContentInit !== undefined) {
        sliderTabsInit.destroy(true, true);
        sliderTabsContentInit.destroy(true, true);
      }
    } else if (breakpointTablet.matches === false) {
      getSlider();
    }
  };

  breakpointTablet.addListener(breakpointChecker);
  breakpointChecker();
};

initTabsSlider();




