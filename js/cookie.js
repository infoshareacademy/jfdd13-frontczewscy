

 
function cookieQuest() {
    const cookieM = document.getElementById('cookie'),
        cookieBtn = document.getElementById('but'),        
        setMyCookie = () => {
            document.cookie ="name=user;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Lax";
        };



    function getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const popUp = () => {
        cookieM.style.display = 'flex';
        cookieBtn.addEventListener('click', popHide);
    };

    const popHide = () => {
        cookieM.style.display = 'none';
        setMyCookie();
    };

    const cookiePop = () => {
        if (getCookie('name') === ''){
            setTimeout(() => popUp(), 1000);
        }
    };

    cookiePop();
}

cookieQuest();

// const cookieM = document.querySelector('.cookie');
// const buttonM = document.querySelector('#but');


// function createCookie() {
//     cookieM.innerHTML = `
        // <h6>Ta strona wykorzystuje pliki cookie</h6>
        // <p>Używamy informacji zapisanych za pomocą plików cookies w celu zapewnienia 
        //     maksymalnej wygody w korzystaniu z naszego serwisu. Mogą też korzystać z 
        //     nich współpracujące z nami firmy badawcze oraz reklamowe. Jeżeli wyrażasz 
        //     zgodę na zapisywanie informacji zawartej w cookies kliknij na &bdquo;x&rdquo; 
        //     w prawym górnym rogu tej informacji. Jeśli nie wyrażasz zgody, ustawienia 
        //     dotyczące plików cookies możesz zmienić w swojej przeglądarce. <a target="_blank" href="./polityka.html"> Czytaj więcej...</a></p>
        // <button id="but">X</button>
//         `
// }


// function setCookie1() {
//     document.cookie = "name=www.frontczewscy.com; expires=Thu, 23 Jan 2020 06:00:00 UTC; path=/";
//     function endOfModal1() {
//         document.querySelector('.modal').style.display='none';
//     }
//     let modalBox = document.querySelector('.modal');
//     modalBox.classList.add('accepted1');   
//     setTimeout(endOfModal1, 1900);
// }

// function getCookie(cname) {
//     const name = cname + "=";
//     const decodedCookie = decodeURIComponent(document.cookie);
//     const ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) === ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) === 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// if (getCookie('name') === ''){
// console.log('działa');
// }

// // if(localStorage.getItem('cookie') === null){
// //     createCookie();
// //     cookieM.style = "display: block";
// //     buttonM.addEventListener('click', function () {
// //         cookieM.style = "display: none";
// //         localStorage.setItem('cookie', 'true');
// //     });
// // }


