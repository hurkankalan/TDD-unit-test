/*
Exercice 1 - Objects
- Créer un test qui vérifie que deux objects ont les memes propriétés (key) et les memes valeurs (values)
- Créer un test qui vérifie que la key supercar de l'object car est falsy
- Créer un test qui vérifie que l'objet car a au moins la propriété et la value name et fature
- Créer un test qui vérifie que la key features de la variable automobile
*/
type Vehicle = {
  name: string;
  features: string[];
  supercar: boolean;
};

const car: Vehicle = {
  name: "Mercedes",
  features: ["fast", "beautiful", "durable"],
  supercar: false,
};

const automobile: Vehicle = {
  name: "Mercedes",
  features: ["fast", "beautiful", "durable"],
  supercar: false,
};

test("Les deux objects car et automobile sont identiques : ils ont les memes key/values", () => {
  expect(car).toEqual(automobile);
  expect(car).toMatchObject({ name: "Mercedes" });
});

test("La propriété supercar a une key qui s'apelle supercar et sa valeur est falsy", () => {
  expect(car).toHaveProperty("supercar", false);
});

test(`L'objet { name: "Mercedes" } est contenu dans l'objet car`, () => {
  expect(car).toMatchObject({ name: "Mercedes" });
});

/*
Exercice 2 - String & number
- Créer un test qui vérifie que deux strings ne sont pas identiques
- Créer un test qui vérifie que le mot "kan" est bien présente dans la variable firstname
- Créer un test qui vérifie que la length de la variable lastname est supérieur ou egale à 5
- Créer un test qui vérifie que l'addition de deux nombres à virgules est correct avec 3 chiffres après la virgule
*/
const lastname: string = "Kalan";
const firstname: string = "Hurkan";

test("Les deux strings ne sont pas identiques", () => {
  expect(firstname).not.toBe(lastname);
});

test("le mot 'kan' est bien présente dans la variable firstname", () => {
  expect(firstname).toMatch("kan");
});

test("La length de la variable lastname est supérieur ou egale à 5", () => {
  expect(lastname.length).toBeGreaterThanOrEqual(5);
});

test("L'addition de deux nombres à virgules est correct avec 3 chiffres après la virgule", () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});

/*
Exercice 3 - Tableau
- Créer un test qui verifie que le mot banana est contenu dans l'array
- Créer un test qui vérifie si l'object ecrit dans le matcher est contenu dans l'array
*/
type Person = {
  name: string;
  role: string;
};

type Fruit = string;

const fruits: Array<Fruit | Person> = [
  "Apple",
  "Banana",
  "Watermelon",
  { name: "Jerome", role: "CEO" },
];

test("Le mot banana est contenu dans l'array", () => {
  expect(fruits).toContain("Watermelon");
});

test("Le mot banana est contenu dans l'array", () => {
  expect(fruits).toContainEqual({ name: "Jerome", role: "CEO" });
});

/*
Exercice 4
*/
test("", () => {
  expect(false).toBeFalsy();
  expect("").toBeFalsy();
  expect(NaN).toBeFalsy();
  expect(NaN).not.toBeUndefined();
  expect(1).toBeTruthy();
});
