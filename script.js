const copyButton = document.querySelector("[data-copy-message]");
const copyStatus = document.querySelector(".copy-status");

const requestText =
  "Здравствуйте, Елизавета Александровна! Хочу записать ребёнка на бесплатное первое занятие. Класс: __. Сложности: __. Удобное время: __.";

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
