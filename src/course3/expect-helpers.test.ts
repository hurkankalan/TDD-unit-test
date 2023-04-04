/*
**Les helpers disponibles sur expect**
La méthode globale expect() a également de nombreux helpers pour les utiliser dans les matchers :
- expect.anything() permet de signifier “avec n’importe quoi”.
- expect.any() : tester qu’une valeur est d’un type particulier ou une instance d’une classe / fonction constructrice
- arrayContaining() : vérifier que plusieurs valeurs d’un tableau donné sont incluses dans un autre tableau
- expect.not.arrayContaining() : tester l’inverse de arrayContaining : que les valeurs dans un tableau ne sont pas incluses dans un autre tableau
- assertions() et hasAssertions() : vérifier que du code asynchrone a bien exécuté un ou plusieurs tests
- objectContaining() : tester qu’un objet contient au moins les propriétés spécifiés
- expect.not.objectContaining() : tester l’inverse objectContaining(), à savoir que les propriétés d’un objet ne sont pas incluses dans un autre objet
- expect.stringContaining() et expect.not.stringContaining() : tester qu’une chaîne de caractère contient ou ne contient pas une chaîne de caractères.
*/

test("tester", () => {
  expect("Toute valeur").toEqual(expect.anything());
});

type Auto = {
  moteur: boolean;
};

function Voiture(this: Auto) {
  this.moteur = true;
}

const tesla: Auto = new (Voiture as any)();

test("tester qu'une valeur est d'un type particulier", () => {
  expect(42).toEqual(expect.any(Number));
  expect(tesla).toEqual(expect.any(Voiture));
});

test("Tester que les valeurs d'un tableau sont incluses dans un tableau", () => {
  expect([1, 2, 3]).toEqual(expect.arrayContaining([2, 3]));
});

test("Tester que toutes les valeurs d'un tableau ne sont pas incluses dans un tableau", () => {
  expect([1, 2, 3]).toEqual(expect.not.arrayContaining([4, 2]));
});

test("Tester qu'un objet contient a minima des propriétés", () => {
  expect({ x: 1, y: 2, c: 3 }).toEqual(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    })
  );
});

// Le test fonctionne si l’objet testé n’a pas de propriété a ayant pour valeur un nombre ET n’a pas de propriété b ayant pour valeur un nombre.
test("Tester qu'un objet contient a minima des propriétés", () => {
  expect({ x: 1, y: 2, z: 3 }).toEqual(
    expect.not.objectContaining({
      a: expect.any(Number),
      b: expect.any(Number),
    })
  );
});

test("ne contient pas la chaîne spécifiée", () => {
  expect("Un chien c'est cool").toEqual(expect.not.stringContaining("chat"));
});

test("ne contient pas la chaîne spécifiée", () => {
  expect("Un Elephant c'est cool").toEqual(
    expect.stringMatching(/[éÉeE]l[eé]phant/)
  );
});
