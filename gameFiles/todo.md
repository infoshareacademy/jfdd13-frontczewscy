1. Instrukcja/funkcja:
- [ ] Refactor
- [ ] Dodać sterowanie?
- [x] spakować wszystko w funkcje, które mogą być od razu wywołane, chodzi o reużywalność kodu
- [x] dodać zmienne pod elementy dom
- [x] przeżucić zmienne na góre pliku
- [ ] skończyć pisać instrukcje

2. Rozpoczynanie gry:
- [x] Stworzyć funkcje która będzie rozpoczynać gre
- [x] Resetuje interwał odliczania czasu
- [x] rozpoczynanie timera
- [x] dodanie event listenerów / poruszanie gracza
- [x] poruszanie się przeciwnika
- [x] rozpoczęcie pojawiania się drinków
- [x] Przy wciskaniu start przycisk nie znika


## Funkcja start powinna zawierać:
```javascript
// resetowanie timera
sec = 60;
clearInterval(timeInterval);
timeInterval = setInterval(function() {
    sec--;
    if (sec < 10) timer.innerHTML = `00: 0${sec}`;
    else timer.innerHTML = `00: ${sec}`;
    if (sec == 0) {
        // po skończeniu czasu gra się kończy
        DomControl.endGame("Time ends");
    }
}, 1000);

// włączenie ruchu gracza
document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);

// poruszanie się przeciwnika
makeRandomMove(true);

// rozpoczęcie pojawiania się drinków
drinkRefreshing = setInterval(spawnDrinks, spawnRate);

```

3. funkcja stop czas
- [x] to do

4. Fukcja gameover:
- [x] zablokowanie ruchu gracza
- [x] zablokowanie ruchu przeciwnika
- [x] wstrzymanie pojawiania się drinków
- [x] usuwanie drinków z planszy
- [x] zerowanie punktów gracza
- [x] wyświetlenie wiadomości końca gry
- [x] wyłącza interwał odliczania czasu
- [x] wyświetla ekran końcowy

## Funkcja game over powinna zawierać
``` javascript
    // usuwa drinki z planszy
    drinksArray = [];

    // przenoszenie graczy w losowe miejsca na planszy
    DomControl.randomSpawn(player1);
    DomControl.randomSpawn(enemy);

    // wyłącza odmierzanie czasu
    clearInterval(timeInterval);

    // ustawia punkty gracza na 0
    // not best place to hold it
    playerPoints = 0;

    // tworzy wiadomość o treści podanej jako parametr fukncji gameover
    const message = new Message(msg, 2000);
    message.renderMessage();

    // usuwa możliwość poruszania się gracza
    document.removeEventListener("keydown", keyPressed);
    document.removeEventListener("keyup", keyReleased);

    // wyłącza ruch przeciwnika
    makeRandomMove(false);
    randomDirections = [];

    // wstrzymanie pojawiania się drinków
    clearInterval(drinkRefreshing);
```

5. Refactor

6. Wchodzenie na strone:
- [x] instrukcja się wyświetla

7. Przejście do gry:
- [x] Drinki nie pojawiają się na ekranie
- [x] Przeciwnik sie nie rusza
- [x] Gracz się nie rusza

8. Grafika
- [x] Poprawić okno wiadomości ? jest eleganckie chyba - m
- [x] Dodać plansze
- [x] Dodać background (za planszą)
- [x] Dodać ikonke gracza
- [x] Dodać ikonke przeciwnika
- [x] Dodać ikonke drinka

9. Dźwięki: 
- [ ] Delikatny dźwięk zdobywania punktów
- [ ] Delikatny dźwięk tracenia punktów
- [ ] Gameover
- [ ] Start game
- [ ] Muzyczka w tle?

10. Gra
- [x] Drinki pojawiają się jeden za drugim podczas picia?
- [x] Drinki pojawiają się zdecydowanie z za małą częstotliwością

11. Tablica wyników
- [x] Zapisywanie do localstorage najlepszego wyniku
- [x] Wyświetlanie go na ekranie końcowym

12. Ekran końcowy
- [x] Wyświetla aktualnie zdobyte punkty
- [x] Wyświetla najlepszy wynik
- [x] Jeżeli gracz pobije swój wynik wyświetla się komunikat "Brawo pobiłeś swój wynik" Or smth.

13. Dodać zwiększanie trudności w grze
- [x] Po zjedzeniu każdego drinka zwiększana jest trudność
