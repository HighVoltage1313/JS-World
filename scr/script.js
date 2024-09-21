document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.menuItem button');
    const pages = document.querySelectorAll('.contentPage');

    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {

            pages.forEach(page => page.classList.remove('active'));

            pages[index].classList.add('active');
        });
    });
});

