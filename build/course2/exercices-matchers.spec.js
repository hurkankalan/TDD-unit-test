"use strict";
const car = {
    name: "Mercedes",
    features: ["fast", "beautiful", "durable"],
    supercar: false,
};
const automobile = {
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
const lastname = "Kalan";
const firstname = "Hurkan";
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
const fruits = [
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
