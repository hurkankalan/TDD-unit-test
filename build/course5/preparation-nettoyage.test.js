"use strict";
/*
**Setup & Teardown : préparation et nettoyage**
Souvent, lorsqu'on écrit des tests, on doit effectuer un travail de préparation avant l'exécution des tests
et un travail de nettoyage après l'exécution des tests. Jest fournit des fonctions d'aide pour gérer cela.

La préparation consiste à exécuter du code avant tous les tests d’une suite, avant un ensemble logique de tests ou avant chaque test.
Le nettoyage consiste à exécuter du code après tous les tests d’une suite, avant un ensemble logique de tests ou avant chaque test.

beforeAll() et afterAll()
- beforeAll() : permet d’exécuter du code avant la suite de tests du fichier.
Par exemple, c’est dans cette méthode que l’on va initialiser une base de données de tests (et éventuellement la remplir avec des données)
et s’y connecter.
ex :
beforeAll(() => {
    return initializeTestDatabase();
});
A noter que si notre fonction retourne une promesse il ne faut pas oublier d’utiliser return pour que Jest détecte celle-ci
et attende qu’elle soit terminée ! (voir le dossier course4 si besoin pour une piqure de rappel).
On peut également utiliser done() ou async / await.

- afterAll() permet d’exécuter du code après la suite de tests du fichier.
Par exemple, c’est dans cette méthode que l’on va supprimer la base de données de test, couper les éventuels serveurs etc.

beforeEach() et afterEach()
Si on a un travail à faire de manière répétitive pour de nombreux tests, on peut use les méthodes beforeEach et afterEach.
- beforeEach() : On peut utiliser beforeEach() à l’intérieur d’un bloc logique de plusieurs tests, c’est-à-dire en l'imbriquant dans un describe().
Dans ce cas, le bloc d’instructions passé à beforeEach() s’exécutera avant chaque test du bloc. Voir le test ci-dessous.
ex:
describe("Connexion des users", () => {
  beforeEach(() => {
    return initializeUserDatabase();
  });

  test("test 1", () => {
    // expect(...)
  });

  test("test 2", () => {
    // expect(...)
  });
});

- afterEach() : Nettoyage après chaque test avec afterEach() : on peut également exécuter du code après chaque test avec afterEach().
On peut par exemple supprimer des données pour certains tests. On peut également utiliser l’imbrication dans un bloc describe comme vu
pour beforeEach().
*/
/*
Attention ! Il faut bien utiliser les méthodes que nous avons vues et ne pas faire les préparations/nettoyages au début ou à la fin
des blocs describe car toutes les méthodes describe() sont exécutées AVANT que les tests à l’intérieur des blocs soient exécutés.
Dans l'exemple ci-dessous : l’ordre d’exécution est 1 > 3 > 6 > 2 > 4 > 5 > 7
*/
describe("1", () => {
    console.log("2");
    describe("3", () => {
        console.log("4");
        test("test 1", () => {
            console.log("5");
            expect(true).toEqual(true);
        });
    });
});
describe("6", () => {
    test("test 2", () => {
        console.log("7");
        expect(true).toEqual(true);
    });
});
