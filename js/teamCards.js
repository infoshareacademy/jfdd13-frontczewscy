const cardsFront = document.querySelectorAll('.front');
const cardsBack = document.querySelectorAll('.back');
const cards = document.querySelectorAll('.card');
const section = document.querySelector('.m-wrapper');

let showed = false;

function showBack(index) {
    cardsFront[index].style.transform = "perspective(600px) rotateY(-180deg)";
    cardsBack[index].style.transform = "perspective(600px) rotateY(0deg)";
}

function showFront(index) {
    cardsFront[index].style.transform = "perspective(600px) rotateY(0deg)";
    cardsBack[index].style.transform = "perspective(600px) rotateY(180deg)";
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
    console.log(element)
    element.addEventListener('mouseout', () => {
        showFront(index)
    })
})

document.addEventListener('scroll', () => {
    if(showed == false && window.pageYOffset > section.offsetTop - 200) {
        showAll();
        showed = true;
        setTimeout(() => {
            hideAll();
        }, 1000);
    }
})

