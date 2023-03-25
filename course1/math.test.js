import { add } from "./math";

/*
describe()
La méthode describe() est également une méthode globale. Cette méthode permet de créer un bloc logique de plusieurs tests.
Les describe() peuvent être utilisés pour créer autant de niveau de hiérarchies que souhaités.
On peut ainsi imbriquer des describe() dans des describe() voir l'exemple ci-dessous :

describe('Lors de la connexion', () => {
  describe('Il est possible de voir sur la page', () => {
    test('x est visible', () => {
      // vérifications
    });
    test('y est visible', () => {
      // vérifications
    });
  });
  describe('les propriétés isLoggedIn et token sont présentes', () => {
    test('isLoggedIn est présent', () => {
      // vérifications
    });
    test('token est présent', () => {
      // vérifications
    });
  });
});

*/

/*
test() et it()
La méthode test() est disponible dans tous les fichiers de tests lancés par Jest. Il s’agit donc d’une méthode globale.
Elle permet de lancer l’exécution d’un test.
it() est l'alias de test() pour les tests rédigés en anglais.

Elle prend 2 ou 3 arguments :
--> test(nom, fn, timeout)

Le premier argument est le nom du test qui sera affiché dans la console. Il doit donc décrire simplement mais précisément le test.
Le second argument est la fonction qui contient les cas à tester.
Le troisième argument est optionnel et est le timeout en ms du test : combien de temps le test doit attendre l’exécution avant de
le déclarer comme échoué. Cet argument est très rarement utile (certains cas asynchrones). Par défaut le timeout est de 5 secondes.

La méthode test() possède plusieurs méthodes helpers permettant de faciliter l’écriture ou l’exécution des tests :
- test.each()
- test.only()
- test.skip()
- test.todo()
*/

describe("Add two number", () => {
  const firstValue = 1;
  const secondValue = 2;
  const finalValue = firstValue + secondValue;

  it("1 + 1 should be 2", () => {
    expect(add(1, 1)).toBe(2);
  });

  /**
   * En utilisant la méthode only(), Jest vas executer uniquement ce test la dans ce fichier et va ignorer les autres test.
   * Lors de l'execution des tests, le test ci-dessous sera executé et les autres seront en état "skipped"
   * Il est possible d'avoir plusieurs only dans le meme fichier de test apparemment (j'ai testé dans de fichier voir le dernier test de cette page)
   */
  it.only("1 + 2 should be 3", () => {
    expect(add(firstValue, secondValue)).toBe(finalValue);
  });

  /**
   * En utilisant la méthode skip(), Jest va ignorer ce test et va executer tous les autres tests de fichier uniquement.
   * Lors de l'execution des tests, le test ci-dessous sera donc, comme vu précédamment ci-dessus, en état "skipped"
   */
  it.skip("4 + 4 should be 8", () => {
    expect(add(4, 4)).toBe(8);
  });

  /**
   * La méthode test.each() prend un tableau de tableaux de données.
   * La fonction passé en deuxième argument à la fonction retournée par each() reçoit en argument les données passées dans le même ordre.
   * Elle exécute ensuite le test avec les arguments.
   * On peut afficher les arguments passés dans la console en utilisant :
   * %s (string), %i (integer), %d (number), %f (float), %j (json), %o (object).
   * Pour afficher l’index de l’itération du test en cours il faut utiliser %#.
   */
  it.each([
    [1, 1, 2],
    [1, 2, 3],
    [4, 4, 8],
  ])("add(%i + %i) = %i", (a, b, c) => {
    expect(add(a, b)).toBe(c);
  });

  /**
   * La méthode describe.each()(nom, fn, timeout).
   * Si on utilise la même suite de tests avec des données différentes c’est la méthode à utiliser.
   * Elle est très similaire à test.each() sauf qu’ici les données dont passées à une suite de tests.
   * Dans l'exemple ci-dessous, nous l'utilisons avec la méthode only() pour que ce soit uniquement cette portion de test soit executé.
   */
  describe.only.each([
    [1, 1, 2],
    [1, 2, 3],
    [2, 1, 3],
  ])("add(%i, %i)", (a, b, expected) => {
    test(`returned value not be greater than ${expected}`, () => {
      expect(add(a, b)).toBe(expected);
    });
    test(`returned value not be greater than ${expected}`, () => {
      expect(add(a, b)).not.toBeGreaterThan(expected);
    });
    test(`returned value not be less than ${expected}`, () => {
      expect(add(a, b)).not.toBeLessThan(expected);
    });
  });
});
