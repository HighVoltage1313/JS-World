window.addEventListener("DOMContentLoaded", updateContent);
window.addEventListener("hashchange", updateContent);

function updateContent() {
  const pages = document.querySelectorAll(".contentPage");
  const buttons = document.querySelectorAll(".container__pages .page");

  pages.forEach((page, index) => {
    const search = page.classList.contains(window.location.hash.substring(1));
    if (search) {
      page.classList.add("active");
      buttons[index].classList.add("active");
    } else {
      page.classList.remove("active");
      buttons[index].classList.remove("active");
    }
  });
}
