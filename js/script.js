const MAX_WIDTH_TABLET = 1439;

const page = document.body;
const menu = document.querySelector(".navigation");

const buttonSignUp = document.querySelector(".navigation__button-sign-up");
const buttonLogIn = document.querySelector(".navigation__button-log-in");
const overlayPopupSignUp = document.querySelector(".modal-sign-up");
const overlayPopupLogIn = document.querySelector(".modal-log-in");
const formsModal = document.querySelectorAll(".modal form");

const buttonСookies = document.querySelector(".main-screen__button");

const blockAccordionPlatformInstallation = document.querySelector(
  ".accordion__list--platform-installation"
);
const blockAccordionFaq = document.querySelector(".accordion__list--faq");

const checkboxsShowPassword = document.querySelectorAll(
  ".modal__input-password-checkbox"
);

/*---------------Aккордeон--------------*/
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
  const isTabPressed = evt.key === "Tab";
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
    "a[href]:not([disabled])"
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
    if (
      menu &&
      menu.classList.contains("navigation--opened") &&
      page.clientWidth < MAX_WIDTH_TABLET
    ) {
      page.classList.add("page-no-scroll");
      return;
    }
    page.classList.remove("page-no-scroll");
  }
};

/*----------Модальное окно с формой регистрации -----------*/
if (overlayPopupSignUp && overlayPopupLogIn) {
  const inputNameModal = overlayPopupSignUp.querySelector("#name");

  const elementsFocusableSignUp = overlayPopupSignUp.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled]), input[type="password"]:not([disabled]), input[type="checkbox"]:not([disabled])'
  );

  const numberElementsSignUp = elementsFocusableSignUp.length;
  const firstFocusElementeSignUp = elementsFocusableSignUp[0];
  const lastFocusElementeSignUp =
    elementsFocusableSignUp[numberElementsSignUp - 1];

  firstFocusElementeSignUp.addEventListener("keydown", (evt) => {
    setFocusTab(evt, firstFocusElementeSignUp, lastFocusElementeSignUp);
  });

  lastFocusElementeSignUp.addEventListener("keydown", (evt) => {
    setFocusTab(evt, firstFocusElementeSignUp, lastFocusElementeSignUp);
  });

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
if (overlayPopupLogIn && overlayPopupSignUp) {
  const inputEmailModal = overlayPopupLogIn.querySelector("#email-log-in");

  const elementsFocusableLogIn = overlayPopupLogIn.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled]), input[type="password"]:not([disabled]), input[type="checkbox"]:not([disabled])'
  );

  const numberElementsLogIn = elementsFocusableLogIn.length;
  const firstFocusElementeLogIn = elementsFocusableLogIn[0];
  const lastFocusElementeLogIn =
    elementsFocusableLogIn[numberElementsLogIn - 1];

  firstFocusElementeLogIn.addEventListener("keydown", (evt) => {
    setFocusTab(evt, firstFocusElementeLogIn, lastFocusElementeLogIn);
  });

  lastFocusElementeLogIn.addEventListener("keydown", (evt) => {
    setFocusTab(evt, firstFocusElementeLogIn, lastFocusElementeLogIn);
  });

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

/*=========Кнопка показать/скрыть пароль=============*/
if (checkboxsShowPassword) {
  checkboxsShowPassword.forEach((inputCheckbox) => {
    inputCheckbox.addEventListener("change", () => {
      const inputPassword = inputCheckbox.closest(".modal__wrapper-password")
        .children[1];
      if (inputCheckbox.checked) {
        inputPassword.type = "text";
        return;
      }
      inputPassword.type = "password";
    });
  });
}

/*================Валидация формы============*/
if (formsModal) {
  formsModal.forEach((form) => {
    const inputsForm = form.querySelectorAll("input");
    const buttonForm = form.querySelector(".modal__button");

    buttonForm.addEventListener("click", (evt) => {
      evt.preventDefault();

      inputsForm.forEach((input) => {
        if (!input.validity.valid) {
          input.classList.add("modal__invalid-input");
        } else {
          input.classList.remove("modal__invalid-input");
        }
      });
    });
  });
}

/*-------------------Кнопка ОК куки------------*/
buttonСookies.addEventListener("click", () => {
  buttonСookies
    .closest(".main-screen__wrapper-info")
    .classList.add("main-screen__wrapper-info--hide");
});
