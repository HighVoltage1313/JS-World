document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.menuItem button');
    const pages = document.querySelectorAll('.contentPage');

    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Удаляем класс active со всех страниц
            pages.forEach(page => page.classList.remove('active'));

            // Добавляем класс active только на соответствующую страницу
            pages[index].classList.add('active');
        });
    });
});

