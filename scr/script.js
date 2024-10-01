document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.contentPage');
    const buttons = document.querySelectorAll('.container__pages .page');

    const buttonArr = buttons;

    pages.forEach((page, index) => {
        let search = page.classList.contains(window.location.search.substring(1));  
        if (search) {page.classList.add('active'); buttonArr[index].classList.add('active');}
        else {page.classList.remove('active'); buttonArr[index].classList.remove('active');}     
    });

});








