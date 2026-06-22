const copyButton = document.querySelector("[data-copy-message]");
const copyStatus = document.querySelector(".copy-status");
const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const forceReveal = new URLSearchParams(window.location.search).get("reveal") === "all";

const requestText =
  "Здравствуйте, Елизавета Александровна! Хочу записать ребёнка на бесплатное первое занятие. Класс: __. Сложности: __. Удобное время: __.";

document.documentElement.classList.add("js");

if (revealItems.length) {
  if (forceReveal) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

if (copyButton && copyStatus) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(requestText);
      copyStatus.textContent = "Текст заявки скопирован.";
    } catch {
      copyStatus.textContent = requestText;
    }
  });
}
