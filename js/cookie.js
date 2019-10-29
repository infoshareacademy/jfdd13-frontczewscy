

const cookieM = document.querySelector('.cookie');



function createCookie() {
    cookieM.innerHTML = `
        <h6>Ta strona wykorzystuje pliki cookie</h6>
        <p>Używamy informacji zapisanych za pomocą plików cookies w celu zapewnienia 
            maksymalnej wygody w korzystaniu z naszego serwisu. Mogą też korzystać z 
            nich współpracujące z nami firmy badawcze oraz reklamowe. Jeżeli wyrażasz 
            zgodę na zapisywanie informacji zawartej w cookies kliknij na &bdquo;x&rdquo; 
            w prawym górnym rogu tej informacji. Jeśli nie wyrażasz zgody, ustawienia 
            dotyczące plików cookies możesz zmienić w swojej przeglądarce. <a target="_blank" href="./polityka.html"> Czytaj więcej...</a></p>
        <button id="but">X</button>
        `
}

if(localStorage.getItem('cookie') === null){
    createCookie();
    cookieM.style = "display: block";
    const buttonM = document.querySelector('#but');
    buttonM.addEventListener('click', function () {
        cookieM.style = "display: none";
        localStorage.setItem('cookie', 'true');
    });
}


