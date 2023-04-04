"use strict";
/*
**Mocker des timers**

**Mocker les timers avec useFakeTimers()**
Dans notre code on peut avoir des timers : setTimeout() et setInterval().
Pour que nos tests restent rapides et pour ne pas avoir de boucles infinies, il est possible d’utiliser des utilitaires Jest permettant
de les remplacer.
On peut automatiquement remplacer tous les timers par des fonctions mock spécifiques aux timers grâce à jest.useFakeTimers()
Grâce à Jest, pas besoin d’attendre la fin des timers pour nos tests !
*/
function unTimer(callback) {
    setTimeout(() => {
        console.log("Faire quelque chose");
        callback();
    }, 1000);
}
jest.useFakeTimers();
test("timers", () => {
    const mock = jest.fn();
    unTimer(mock);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
/*
**Tester le délai avant l’exécution de timers avec runAllTimers()**
--> runAllTimers() permet de simuler la fin de tous les timers mockés.
Dans cet exemple, nous lançons le timer en passant une fonction de rappel.
Ensuite, nous nous attendons à que la fonction de rappel ne soit pas encore appelée car le timer est en cours.
Nous exécutons alors jest.runAllTimers() pour déclencher la fin du timer sans avoir à attendre 1 seconde.
Enfin, nous nous attendons à ce que la fonction de rappel ait été invoquée car le timer est terminé.
*/
function unTimer2(callback) {
    setTimeout(() => {
        console.log("Faire quelque chose");
        callback();
    }, 1000);
}
jest.useFakeTimers();
test("timers", () => {
    const mock = jest.fn();
    unTimer2(mock);
    expect(mock).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(mock).toHaveBeenCalledTimes(1);
});
/*
**Tester des timers récursifs ou des intervalles**
Parfois, on aura des timers qui appellent d’autres timers créant des boucles infinies ou longues.
On peut avoir également des setInterval().
Pour ne tester que la première exécution du timer on peut utiliser runOnlyPendingTimers()
--> Si on n’utiliserait pas runOnlyPendingTimers(), on aura ici une boucle infinie.
*/
function unTimer3(callback) {
    setInterval(() => {
        console.log("Faire quelque chose");
        callback();
    }, 500);
}
jest.useFakeTimers();
test("timers", () => {
    const mock = jest.fn();
    unTimer3(mock);
    expect(mock).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(mock).toHaveBeenCalledTimes(1);
});
/*
** Avancer des timers d’une durée spécifiée avec advanceTimersByTime()**
Une dernière possibilité, est de pouvoir avancer tous les timers mockés en cours d’une certaine durée avec advanceTimersByTime().
*/
function unTimer4(callback) {
    setTimeout(() => {
        console.log("Faire quelque chose");
        callback();
    }, 500);
}
jest.useFakeTimers();
test("timers", () => {
    const mock = jest.fn();
    unTimer4(mock);
    expect(mock).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(mock).toHaveBeenCalledTimes(1);
});
