/*
TYPES
Pour installer les types Typescript de Jest dans nos projets :
--> npm i  @types/jest
VS Code va ainsi pouvoir automatiquement récupérer les types et les arguments des méthodes et fonctions et utiliser l’autocomplétion !
*/

/*
MATCHERS
La méthode expect() permet d’utiliser des méthodes appelés matchers permettant de vérifier si des valeurs respectent des conditions.
Nous verrons les helpers disponible sur la méthode expect().
Expect peut prendre en parametres des functions, objects, array, string, number, etc.
Il existe plusieurs types de matchers :
- Les matchers d'égalités stricte
- Les martchers pour les string
- Les matchers pour les nombres
- Les matchers pour les objets
- Les matchers pour les tableaux
- Les matchers pour les fonctions mock
- Les matchers de valeurs strict
- Les matchers pour les erreurs
- Les matchers spécifiques aux promises
-   
*/

describe("Expect et matchers", () => {
  describe("Les objects obj1 et obj2", () => {
    const obj1 = {
      name: "Hurkan",
      age: 30,
    };

    const obj2 = {
      name: "Hurkan",
      age: 30,
    };

    test("ont les mêmes propriétés", () => {
      expect(obj1).toEqual(obj2); // success car on ne test pas l'egalité ici mais si elles ont les memes key/value
    });
    test("mais n'ont pas la même référence", () => {
      expect(obj1).toBe(obj2); // failed car un objet n'est jamais égal à un autre objet en JS : c'est uniquement valable pour les primitives
    });
  });

  describe();
});
