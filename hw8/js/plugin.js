// timer
const buttons = document.querySelectorAll('[data-time]');
const form = document.forms.customForm;
const minutesInput = form.elements.minutes;
const stopBtn = document.querySelector('.stopBtn');
const pauseBtn = document.querySelector('.pauseBtn');


const timer = (function () {

    let countDown,
        timerDisplay,
        endTime,
        alarmSound,
        secondsLeft;
    let pause = false;

    function init(settings) {
        timerDisplay = document.querySelector(settings.timeLeftSelector);
        endTime = document.querySelector(settings.timeEndSelector);

        if (settings.alarmSound){
            alarmSound = new Audio(settings.alarmSound);
        }

        return this
    }

    function start(seconds) {
        if (!timerDisplay || !endTime) return console.log('pls init module first');
        if (!seconds || typeof seconds !== 'number') return console.log('pls pass seconds');

        //Reset timer
        clearInterval(countDown);

        if (alarmSound){
            //Reset sound
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }

        const now = Date.now();
        const then = now + seconds * 1000;

        displayTimeLeft(seconds);
        displayEndTime(then);
        stopBtn.closest('div').style.display = "block";
        pauseBtn.textContent = "Pause";
        pause = false;

        countDown = setInterval(() =>{
            secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0){
                clearInterval(countDown);
                playSound();
                return;
            }
            displayTimeLeft(secondsLeft);
        }, 1000)
    }

    function displayTimeLeft(seconds) {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24) / 3600));
        const minutes = Math.floor((seconds % 3600) / 60);
        const reminderSeconds = seconds % 60;
        let display;

        if (days){
            display = `${days <= 0 ? '' : days < 2 ? days +' day ' : days + ' days '}${
                hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${
                minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        } else {
            display = `${hours <= 0 ? '' : hours < 10 ? '0' + hours + ':' : hours + ':'}${
                minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        }

        document.title = display;
        timerDisplay.textContent = display;
    }

    function displayEndTime(timestamp) {
        const end = new Date(timestamp);
        const hour = end.getHours();
        const minutes = end.getMinutes();
        const day = end.getDay();
        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        endTime.textContent = `Be back in ${week[day]} at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
    }

    function stop() {
        clearInterval(countDown);

        if (alarmSound){
            //Reset sound
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }

        displayTimeLeft(0);
        stopBtn.closest('div').style.display = "none";
        endTime.textContent = '';
    }

    function playSound() {
        alarmSound.play();
    }

    function pause__play() {
        if (!pause){
            clearInterval(countDown);
            pauseBtn.textContent = "Continue";
            pause = true;
        } else {
            start(secondsLeft);
        }
    }

    return{
        init,
        start,
        stop,
        pause__play,
    }

}());

//init timer

timer.init({
    timeLeftSelector: '.display__time-left',
    timeEndSelector: '.display__end-time',
    alarmSound: 'audio/bell.mp3'
});


//start timer by click

function startTimerByBtn(e) {
    const seconds = parseInt(this.dataset.time);
    timer.start(seconds);
}

function startTimerByInput(e) {
    e.preventDefault();
    const seconds = parseInt(minutesInput.value) * 60;
    timer.start(seconds);
    form.reset();
}


buttons.forEach(btn => btn.addEventListener('click', startTimerByBtn));
form.addEventListener('submit', startTimerByInput);
stopBtn.addEventListener('click', () => timer.stop());

// Как лучше передать метод timer.stop??
//stopBtn.addEventListener('click', timer.stop);
// или
//stopBtn.addEventListener('click', () => timer.stop());

pauseBtn.addEventListener('click', () => timer.pause__play());