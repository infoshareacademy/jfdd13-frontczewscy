const cardsFront = document.querySelectorAll('.front');
const cardsBack = document.querySelectorAll('.back');
const cards = document.querySelectorAll('.card');
const section = document.querySelector('.m-wrapper');
const bodyDocument = document.querySelector('body');

let showed = false;

function showBack(index) {
    // cardsFront[index].style.transform = "perspective(600px) rotateY(-180deg)";
    // cardsBack[index].style.transform = "perspective(600px) rotateY(0deg)";
    cardsFront[index].classList.add("hidden");
    cardsBack[index].classList.remove("hidden");
}

function showFront(index) {
    // cardsFront[index].style.transform = "perspective(600px) rotateY(0deg)";
    // cardsBack[index].style.transform = "perspective(600px) rotateY(180deg)";
    cardsFront[index].classList.remove("hidden");
    cardsBack[index].classList.add("hidden") ;
}

function showAll() {
    for(let i = 0; i < cards.length; i++) {
        showBack(i);
    }
}

function hideAll() {
    for(let i = 0; i < cards.length; i++) {
        showFront(i);
    }
}

cards.forEach((element, index) => {
    element.addEventListener('mouseover', () => {
        showBack(index);
    })
})

cards.forEach((element, index) => {
    element.addEventListener('mouseout', () => {
        showFront(index)
    })
})

document.addEventListener('scroll', () => {
    if(showed == false && (window.pageYOffset >= bodyDocument.offsetHeight - window.screen.height - 200 || window.pageYOffset >= section.offsetTop - window.screen.height / 2)) {
        showAll();
        showed = true;
        setTimeout(() => {
            hideAll();
        }, 800);
    }
})

