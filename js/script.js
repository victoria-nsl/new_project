/*---------------Aккордион--------------*/
const blockAccordion = document.querySelector(".accordion__list");

if (blockAccordion) {
  const itemsAccordion = blockAccordion.querySelectorAll(".accordion__item");
  const triggers = blockAccordion.querySelectorAll(".accordion__button");

  const hideContent = (item) => {
    item.classList.remove("accordion__item--active");
    item.classList.add("accordion__item--closed");
  };

  const showContent = (item) => {
    item.classList.add("accordion__item--active");
    item.classList.remove("accordion__item--closed");
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      const itemAccordionCurrent = itemsAccordion[index];

      if (itemAccordionCurrent.classList.contains("accordion__item--active")) {
        hideContent(itemAccordionCurrent);
        return;
      }

      itemsAccordion.forEach((itemAccordion) => {
        if (itemAccordion.classList.contains("accordion__item--active")) {
          hideContent(itemAccordion);
        }
      });
      showContent(itemAccordionCurrent);
    });
  });
}
