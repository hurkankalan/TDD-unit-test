"use strict";
/*
**Moke functions**
Les fonctions mock permettent de tester une fonction sans son implémentation.
Elles permettent de tester si une fonction a été appelée, combien de fois, avec quels arguments etc.
Elles sont utilisées pour remplacer une fonction que nous ne pouvons pas contrôler, par une fonction que nous contrôlons.

Pour créer une fonction mock Jest, il suffit de faire : const monMock = jest.fn();

Les fonctions mock ont une propriété mock permettant de recueillir des informations sur l’état de celles-ci.
Nous pouvons savoir ainsi :
- Le nombre de fois elles ont été appelés avec mock.calls.length.
- récupérer les arguments reçus par notre fonction mock avec mock.calls, qui contient un tableau de tableaux contenant les arguments
pour chaque exécution (dans notre dernier exemple [ [ 0 ], [ 1 ] ]).
- de connaitre les valeurs des retours d’exécution de notre fonction avec mock.results qui contient un tableau des valeurs qui ont été return
([0, 42] dans notre dernier exemple)
*/
describe("mock function exemples", () => {
    test("should call function", () => {
        const func = jest.fn();
        func();
        console.log(func.mock.calls);
    });
});
