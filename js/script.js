/*---------------Aккордион--------------*/
const blockAccordionPlatformInstallation = document.querySelector(
  ".accordion__list--platform-installation"
);
const itemsAccordionPlatformInstallation =
  blockAccordionPlatformInstallation.querySelectorAll(".accordion__item");
const triggersPlatformInstallation =
  blockAccordionPlatformInstallation.querySelectorAll(".accordion__button");

const blockAccordionFaq = document.querySelector(".accordion__list--faq");
const itemsAccordionFaq =
  blockAccordionFaq.querySelectorAll(".accordion__item");
const triggersFaq = blockAccordionFaq.querySelectorAll(".accordion__button");

const hideContent = (item) => {
  item.classList.remove("accordion__item--active");
  item.classList.add("accordion__item--closed");
};

const showContent = (item) => {
  item.classList.add("accordion__item--active");
  item.classList.remove("accordion__item--closed");
};

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

triggersPlatformInstallation.forEach((trigger, index) => {
  trigger.addEventListener("click", () => {
    const itemAccordionCurrent = itemsAccordionPlatformInstallation[index];

    if (itemAccordionCurrent.classList.contains("accordion__item--active")) {
      hideContent(itemAccordionCurrent);
      return;
    }

    itemsAccordionPlatformInstallation.forEach((itemAccordion) => {
      if (itemAccordion.classList.contains("accordion__item--active")) {
        hideContent(itemAccordion);
      }
    });
    showContent(itemAccordionCurrent);
  });
});
