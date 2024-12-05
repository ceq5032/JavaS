const events = document.querySelectorAll('.event');

events.forEach(event => {
    event.addEventListener('mouseover', () => {
        event.style.backgroundColor = 'rgba(139,23,23,0.55)';
    });

    event.addEventListener('mouseout', () => {
        event.style.backgroundColor = 'transparent';
    });
});

const timeline = document.querySelector('.timeline');

timeline.addEventListener('wheel', (event) => {
    timeline.scrollTop += event.deltaY;
});

// Timeline and transition
const timeLine = document.querySelector('.landing');
const transitionButton = document.getElementById('transitionButton');

const goToLandingButton = document.getElementById('goToLanding');

goToLandingButton.addEventListener('click', () => {
    window.location.href = 'landing.html';
});

//  Fade Out
goToLandingButton.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = 'landing.html';
    }, 500);
});





