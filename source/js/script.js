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

class Tabs {
  constructor() {
    this._windowWidth = window.innerWidth;
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._init();
  }

  _init() {
    this._initAllTabs();
    document.addEventListener('click', this._documentClickHandler);
  }

  _resizeObserver() {
    return new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target.classList.contains('is-active')) {
          this._updateTabHeight();
        }
      }
    });
  }

  _documentClickHandler(evt) {
    const target = evt.target;
    if (!target.closest('[data-tabs="control"]')) {
      return;
    }
    evt.preventDefault();
    const control = target.closest('[data-tabs="control"]');
    this.openTab(control);
  }

  _initAllTabs() {
    const tabs = document.querySelectorAll('[data-tabs="parent"]');
    const forLoadTabs = document.querySelectorAll('[data-tabs="element"].for-load');
    tabs.forEach((tab) => {
      this._initTab(tab);
    });
    forLoadTabs.forEach((tab) => {
      tab.classList.remove('for-load');
    });
  }

  _removeAllActiveClasses(tabControlElements, tabElements) {
    tabElements.forEach((tab) => {
      tab.classList.remove('is-active');
    });

    tabControlElements.forEach((element, index) => {
      element.classList.remove('is-active');
      element.setAttribute('data-index', index);
    });
  }

  _setTabStartState(tab, dataHeight, tabElements, tabContentElement, tabControlElements, dataDelay) {
    const activeIndex = this._returnActiveIndex(tabControlElements);
    const blockHeight = dataHeight === 'max' ? this._returnMaxHeight(tabElements) : tabElements[activeIndex].offsetHeight;
    this._removeAllActiveClasses(tabControlElements, tabElements);
    tab.classList.add('no-transition');
    tabControlElements[activeIndex].classList.add('is-active');
    tabElements[activeIndex].classList.add('is-active');
    if (dataHeight !== 'unset') {
      tabContentElement.style.height = `${blockHeight}px`;
    }
    setTimeout(() => {
      if (dataDelay) {
        tab.classList.remove('no-transition');
      }
    }, dataDelay);
  }

  _returnActiveIndex(tabControlElements) {
    let activeIndex = 0;
    let flag = true;
    tabControlElements.forEach((control, index) => {
      if (control.classList.contains('is-active') && flag) {
        activeIndex = index;
        flag = false;
      }
    });
    return activeIndex;
  }

  _returnMaxHeight(tabElements) {
    let height = [];
    tabElements.forEach((element) => {
      height.push(element.offsetHeight);
    });
    height.sort((a, b) => a - b);
    return height[height.length - 1];
  }

  _returnScopeList(nodeList, parent) {
    const array = [];
    nodeList.forEach((element) => {
      const elementParent = element.closest('[data-tabs="parent"]');
      if (elementParent === parent) {
        array.push(element);
      }
    });

    return array;
  }

  _returnScopeChild(nodeList, parent) {
    let currentChild;
    nodeList.forEach((element) => {
      const elementParent = element.closest('[data-tabs="parent"]');
      if (elementParent === parent) {
        currentChild = element;
      }
    });

    return currentChild;
  }

  _updateTabHeight() {
    const activeElements = document.querySelectorAll('[data-tabs="element"].is-active');
    activeElements.forEach((element) => {
      let transition = false;
      const parent = element.closest('[data-tabs="parent"]');
      if (parent.closest('[data-tabs="element"]')) {
        transition = true;
      }
      this._setTabElementHeight(element, transition);
    });
  }

  _setTabElementHeight(element, transition) {
    const parentElement = element.closest('[data-tabs="parent"]');
    const dataHeight = parentElement.dataset.height;
    const contentElement = this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="content"]'), parentElement);
    const tabElements = this._returnScopeList(parentElement.querySelectorAll('[data-tabs="element"]'), parentElement);

    if (!transition) {
      parentElement.classList.add('no-transition');
    }

    if (dataHeight === 'max') {
      contentElement.style.height = `${this._returnMaxHeight(tabElements)}px`;
    } else if (dataHeight === 'unset') {
      contentElement.style.height = null;
    } else {
      contentElement.style.height = `${this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="element"].is-active'), parentElement).offsetHeight}px`;
    }

    setTimeout(() => parentElement.classList.remove('no-transition'));
  }

  _initTab(tab) {
    const dataHeight = tab.dataset.height;
    const dataDelay = tab.dataset.delay ? tab.dataset.delay : 0;
    const tabContentElement = tab.querySelector('[data-tabs="content"]');
    const tabControlElements = this._returnScopeList(tab.querySelectorAll('[data-tabs="control"]'), tab);
    const tabElements = this._returnScopeList(tab.querySelectorAll('[data-tabs="element"]'), tab);
    this._setTabStartState(tab, dataHeight, tabElements, tabContentElement, tabControlElements, dataDelay);
    if (dataHeight !== 'unset') {
      tabElements.forEach((element) => {
        this._resizeObserver().observe(element);
      });
    }
    setTimeout(() => {
      tab.classList.remove('no-transition-global');
    });
  }

  reInit() {
    this._initAllTabs();
  }

  openTab(control) {
    const currentIndex = control.dataset.index;
    const parentElement = control.closest('[data-tabs="parent"]');

    if (control.classList.contains('is-active') || parentElement.classList.contains('no-action')) {
      return;
    }

    const dataDelay = parentElement.dataset.delay ? parentElement.dataset.delay : 0;
    const dataHeight = parentElement.dataset.height;
    const contentElement = parentElement.querySelector('[data-tabs="content"]');
    const tabElements = this._returnScopeList(parentElement.querySelectorAll('[data-tabs="element"]'), parentElement);

    const activeControl = this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="control"].is-active'), parentElement);
    const activeElement = this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="element"].is-active'), parentElement);
    const currentHeight = contentElement.offsetHeight;
    const newHeight = tabElements[currentIndex].offsetHeight;

    parentElement.classList.add('no-action');
    document.activeElement.blur();

    if (activeControl) {
      activeControl.classList.remove('is-active');
    }

    if (activeElement) {
      activeElement.classList.remove('is-active');
    }

    if (currentHeight > newHeight) {
      setTimeout(() => {
        if (dataHeight !== 'max' && dataHeight !== 'unset') {
          contentElement.style.height = newHeight + 'px';
        }
        control.classList.add('is-active');
        tabElements[currentIndex].classList.add('is-active');
        parentElement.classList.remove('no-action');
      }, dataDelay);
    } else {
      if (dataHeight !== 'max' && dataHeight !== 'unset') {
        contentElement.style.height = newHeight + 'px';
      }
      setTimeout(() => {
        control.classList.add('is-active');
        tabElements[currentIndex].classList.add('is-active');
        parentElement.classList.remove('no-action');
      }, dataDelay);
    }
  }
}

let tabs;

const initTabs = () => {
  tabs = new Tabs();
  window.tabs = tabs;
};

const control = document.querySelector('.tabs__link');

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initTabs();
  });
});

/* Swiper destroy */

const tabsSlider = document.querySelector('.tabs__links');
const breakpointTablet = window.matchMedia('(min-width: 768px)');

const initTabsSlider = () => {
  let sliderTabsInit;

  const getSlider = () => {
    if (tabsSlider) {
      sliderTabsInit = new Swiper(tabsSlider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        grabCursor: true,
        slideToClickedSlide: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
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




