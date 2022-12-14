const MAX_WIDTH_TABLET = 1439;

const page = document.body;
const menu = document.querySelector(".navigation");

const buttonSignUp = document.querySelector(".navigation__button-sign-up");
const buttonLogIn = document.querySelector(".navigation__button-log-in");
const overlayPopupSignUp = document.querySelector(".modal-sign-up");
const overlayPopupLogIn = document.querySelector(".modal-log-in");

/*---------------Aккордeон--------------*/
const blockAccordionPlatformInstallation = document.querySelector(
  ".accordion__list--platform-installation"
);

const blockAccordionFaq = document.querySelector(".accordion__list--faq");

const hideContent = (item) => {
  item.classList.remove("accordion__item--active");
  item.classList.add("accordion__item--closed");
};

const showContent = (item) => {
  item.classList.add("accordion__item--active");
  item.classList.remove("accordion__item--closed");
};

if (blockAccordionFaq) {
  const itemsAccordionFaq =
    blockAccordionFaq.querySelectorAll(".accordion__item");
  const triggersFaq = blockAccordionFaq.querySelectorAll(".accordion__button");

  triggersFaq.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      const itemAccordionCurrent = itemsAccordionFaq[index];

      if (itemAccordionCurrent.classList.contains("accordion__item--active")) {
        hideContent(itemAccordionCurrent);
        return;
      }

      itemsAccordionFaq.forEach((itemAccordion) => {
        if (itemAccordion.classList.contains("accordion__item--active")) {
          hideContent(itemAccordion);
        }
      });
      showContent(itemAccordionCurrent);
    });
  });
}

if (blockAccordionPlatformInstallation) {
  const itemsAccordionPlatformInstallation =
    blockAccordionPlatformInstallation.querySelectorAll(".accordion__item");
  const triggersPlatformInstallation =
    blockAccordionPlatformInstallation.querySelectorAll(".accordion__button");

  triggersPlatformInstallation.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      const itemAccordionCurrent = itemsAccordionPlatformInstallation[index];

      if (itemAccordionCurrent.classList.contains("accordion__item--active")) {
        hideContent(itemAccordionCurrent);
        return;
      }

      showContent(itemAccordionCurrent);
    });
  });
}

/*------------ОТКРЫТИЕ/ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ-------------*/
const closeMenu = () => {
  menu.classList.add("navigation--closed");
  menu.classList.remove("navigation--opened");
  page.classList.remove("page-no-scroll");
};

const openMenu = () => {
  menu.classList.remove("navigation--closed");
  menu.classList.add("navigation--opened");
  page.classList.add("page-no-scroll");
};

const setFocusTab = (evt, firstElement, lastElement) => {
  const isShiftPressed = evt.shiftKey;
  const isTabPressed = evt.key === "Tab" || evt.keyCode === KEYCODE_TAB;
  if (!isTabPressed) {
    return;
  }

  if (
    isShiftPressed &&
    isTabPressed &&
    document.activeElement === firstElement
  ) {
    lastElement.focus();
    evt.preventDefault();
  }

  if (
    !isShiftPressed &&
    isTabPressed &&
    document.activeElement === lastElement
  ) {
    evt.preventDefault();
    firstElement.focus();
  }
};

if (menu && page.clientWidth < MAX_WIDTH_TABLET) {
  const navigationToggle = menu.querySelector(".navigation__button");
  const navigation = menu.querySelector(".navigation__site-list");
  const elementsFocusable = navigation.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  );

  const numberElements = elementsFocusable.length;
  const firstFocusElement = elementsFocusable[0];
  const lastFocusElement = elementsFocusable[numberElements - 1];

  navigationToggle.addEventListener("click", () => {
    if (menu.classList.contains("navigation--closed")) {
      openMenu();
      return;
    }
    closeMenu();
  });

  elementsFocusable.forEach((element) =>
    element.addEventListener("click", () => closeMenu())
  );

  firstFocusElement.addEventListener("keydown", (evt) => {
    setFocusTab(evt, firstFocusElement, lastFocusElement);
  });

  lastFocusElement.addEventListener("keydown", (evt) => {
    setFocusTab(evt, firstFocusElement, lastFocusElement);
  });
}

/*------------ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН-------------*/

const openPopup = (overlayPopup, inputModal) => {
  overlayPopup.classList.add("modal__show");
  page.classList.add("page-no-scroll");
  inputModal.focus();
};

const closePopup = (overlayPopup) => {
  if (overlayPopup.classList.contains("modal__show")) {
    overlayPopup.classList.remove("modal__show");
    page.classList.remove("page-no-scroll");
  }
};

/*----------Модальное окно с формой регистрации -----------*/
if (overlayPopupSignUp) {
  const inputNameModal = overlayPopupSignUp.querySelector("#name");

  const onDocumentEscKeydown = (evt) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closePopup(overlayPopupSignUp);
      document.removeEventListener("keydown", onDocumentEscKeydown);
    }
  };

  const onClickOverlayPopupSignUp = (evt) => {
    if (evt.target.matches("section")) {
      closePopup(overlayPopupSignUp);
    }
  };

  const onClickButtonSignUp = (evt) => {
    evt.preventDefault();
    openPopup(overlayPopupSignUp, inputNameModal);
    document.addEventListener("keydown", onDocumentEscKeydown);
  };

  overlayPopupSignUp.addEventListener("click", onClickOverlayPopupSignUp);
  buttonSignUp.addEventListener("click", onClickButtonSignUp);
}

/*----------Модальное окно с формой логина -----------*/
if (overlayPopupLogIn) {
  const inputEmailModal = overlayPopupLogIn.querySelector("#email-log-in");

  const onDocumentEscKeydown = (evt) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closePopup(overlayPopupLogIn);
      document.removeEventListener("keydown", onDocumentEscKeydown);
    }
  };

  const onClickOverlayPopupLogIn = (evt) => {
    if (evt.target.matches("section")) {
      closePopup(overlayPopupLogIn);
    }
  };

  const onClickButtonLogIn = (evt) => {
    evt.preventDefault();
    openPopup(overlayPopupLogIn, inputEmailModal);
    document.addEventListener("keydown", onDocumentEscKeydown);
  };

  overlayPopupLogIn.addEventListener("click", onClickOverlayPopupLogIn);
  buttonLogIn.addEventListener("click", onClickButtonLogIn);
}
