const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  speed: 400,
  spaceBetween: 100,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction"
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});
const body = document.body;
const modal = document.querySelector(".modal");
const burger = document.querySelector(".modal__toggler");
const modalCloseBtn = document.querySelector(".close__btn");
const modalLinks = document.querySelector(".modal__links");
burger.addEventListener("click", (e) => {
  body.classList.add("locked");
  modal.dataset.visible = true;
});
modalCloseBtn.addEventListener("click", () => {
  body.classList.remove("locked");
  modal.dataset.visible = false;
});
window.addEventListener("keydown", (e) => {
  if (body.classList.contains("locked") && e.key === "Escape") {
    body.classList.remove("locked");
    modal.dataset.visible = false;
  }
});
modalLinks.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal__link")) {
    body.classList.remove("locked");
    modal.dataset.visible = false;
  }
});
const style = "";
window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});
