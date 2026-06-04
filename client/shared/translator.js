function applyTranslations() {
  const lang = localStorage.getItem("lang") || "en";
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-text]").forEach(el => {
    const key = el.getAttribute("data-text");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-text-ph]").forEach(el => {
    const key = el.getAttribute("data-text-ph");
    if (dict[key]) el.placeholder = dict[key];
  });
}

document.addEventListener("DOMContentLoaded", applyTranslations);