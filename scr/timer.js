const timeZone = document.querySelector('.time-zone');

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const offset = new Date().getTimezoneOffset();
let offsetHours = offset / 60 * -1;
if (offsetHours > 0) {offsetHours = "+" + offsetHours;}

timeZone.textContent = 'Your Time Zone: ' + userTimeZone + ' ' + offsetHours;

const timeOut = document.querySelector('.time-remaining');
const targetDate = new Date('December 31, 2024 23:59:59');

const interval = setInterval(() => {
    const timeNow = new Date().getTime();
    const timeRemaining = targetDate.getTime() - timeNow;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const formattedTime = 
            (days < 10 ? '0' : '') + days + ' D ' +
            (hours < 10 ? '0' : '') + hours + ' H ' +
            (minutes < 10 ? '0' : '') + minutes + ' M ' +
            (seconds < 10 ? '0' : '') + seconds + ' S';

    timeOut.textContent = formattedTime ;
}, 1000);