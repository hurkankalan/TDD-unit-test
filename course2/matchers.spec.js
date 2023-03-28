/*
**TYPES**
Pour installer les types Typescript de Jest dans nos projets :
--> npm i  @types/jest
VS Code va ainsi pouvoir automatiquement récupérer les types et les arguments des méthodes et fonctions et utiliser l’autocomplétion !
Pour ouvrir les tests en mode watch, dans le package.json, changer "test": "jest" par "test": "jest --watch"
On pourrait mettre d'autres options comme un pattern, ou l'execution d'un fichier en particulier etc, je vous laisse regarder dans la doc.
Lien : https://jestjs.io/fr/docs/cli

**MATCHERS**
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
*/

/*
**Les matchers d'égalités stricte**
- toBe() : Ce matcher doit être utilisé pour la comparaison de valeurs primitives car il utilise Object.is()
Les deux différences entre Object.is() et === est que Object.is() considère que NaN et NaN sont égaux mais que +0 et -0 sont différents.
Il est encore plus précis que l’égalité stricte.
Attention : ne pas l’utiliser avec des nombres de type float (0.2 + 0.1 n’est pas égal à 0.3 en JS, je sais c'est de la sorcellerie).

- toEqual() : Ce matcher doit être utilisé pour la comparaison d’objets.
C’est ce qu’on appelle la comparaison d’égalité profonde (deep equality).

- toStrictEqual() : Ce matcher est aussi utilisé pour la comparaison d’objets mais est plus rigoureux que toEqual().
Il y a exactement trois différences. Dans les trois cas suivants toEqual() renverra true mais toStrictEqual() renverra false :
1. Si une propriété vaut undefined dans un objet et n’est pas présente sur l’autre objet.
2. Si un tableau a un index avec aucune valeur (sparse array) et l’autre tableau a pour le même index la valeur undefined.
3. Si deux objets ont les mêmes propriétés mais un des objets est un objet littéral et l’autre objet une instance d’une classe ou d’une fonction constructeur.
*/
describe("Les matchers d'égalités stricte", () => {
  const obj1 = {
    name: "Hurkan",
    age: 30,
  };
  const obj2 = {
    name: "Hurkan",
    age: 30,
  };

  const str1 = "Martin";
  const str2 = "Martin";

  function Classe() {
    this.prop1 = 42;
    this.prop2 = "koala";
  }

  const obj3 = {
    prop1: 42,
    prop2: "koala",
  };

  const obj4 = new Classe();

  describe("Les objects obj1 et obj2", () => {
    test("ont les mêmes propriétés", () => {
      expect(obj1).toEqual(obj2); // success car on ne test pas l'egalité ici mais si elles ont les memes key/value
    });
    test("mais n'ont pas la même référence", () => {
      expect(obj1).toBe(obj2); // failed car un objet n'est jamais égal à un autre objet en JS : c'est uniquement valable pour les primitives
    });
    test("en comparant deux string, elles ont les memes valeurs et les memes références", () => {
      expect(str1).toBe(str2); // success car deux strings qui ont la meme valeur pointe sur la meme case mémoire
      expect(str1).toEqual(str2); // success
    });
  });

  describe("Les objets obj3 et obj4", () => {
    test("ont les mêmes propriétés", () => {
      expect(obj3).toEqual(obj4);
    });
    test("mais ne sont pas strictement égaux", () => {
      expect(obj3).not.toStrictEqual(obj4);
    });
  });
});

/*
**Les matchers pour les string**
- toMatch() prend en argument une chaîne de caractère ou une expression régulière et permet de voir si la valeur la contient.
*/
describe("Les matchers pour les strings", () => {
  const sentence = "La vie de développeur que nous avons choisit";
  const sentence2 = "Les développeurs d'Awaken sont des philosophes de la vie";
  const deviceId = "352625698329420";

  test.each([sentence, sentence2])(
    "La variable sentence contient le mot vie",
    (phrase) => {
      expect(phrase).toMatch("vie");
    }
  );
  test(`La regex passé dans le matcher match avec le device ${deviceId}`, () => {
    expect(deviceId).toMatch(/^[0-9]{15}$/);
  });
});

/*
**Les matchers pour les objects**
- Le matcher toHaveProperty() permet de vérifier qu’un objet a la propriété spécifiée et optionnellement de vérifier la valeur
pour cette propriété. On peut vérifier la présence de propriétés imbriquées avec .toHaveProperty("prop1.propImbriquee").

- Le matcher toMatchObject() est plus avancé : il permet de vérifier qu’un objet possède les propriétés et les valeurs d’un autre objet.
Il est également utilisable avec des tableaux d’objets pour vérifier que les objets correspondent et qu’il y a exactement le même
nombre d’éléments.

- Le matcher toBeInstanceOf() permet de tester qu’un objet est une instance d’une classe ou d’une fonction constructeur.
*/
describe("Les matchers pour les objets", () => {
  const teamDev = {
    lead: "Christophe",
    devOps: "Xavier",
    scrumMaster: "Martin",
    fullStack: {
      first: "Mahamat",
      second: "Fadhillah",
      third: "Jordan",
    },
    skills: {
      hard: ["JavaScript", "React.js", "Node.js"],
      soft: ["Entraide", "Persévérance", "Excellence"],
    },
  };

  const teamDev2 = {
    lead: "Christophe",
    devOps: "Xavier",
    scrumMaster: "Martin",
    fullStack: {
      first: "Mahamat",
      second: "Fadhillah",
      third: "Jordan",
    },
    skills: {
      hard: ["JavaScript", "React.js", "Node.js"],
      soft: ["Entraide", "Persévérance", "Excellence"],
    },
  };

  test(`L'object teamDev a pour propriété`, () => {
    expect(teamDev).toHaveProperty("devOps"); // success
    expect(teamDev).toHaveProperty("lead", "Christophe"); // success, la propriété lead existe et sa valeur est bien Christophe
    // expect(teamDev).toHaveProperty("lead", "Martin"); // failed
    expect(teamDev).toHaveProperty("fullStack", {
      first: "Mahamat",
      second: "Fadhillah",
      third: "Jordan",
    }); // success
    expect(teamDev).toHaveProperty("skills.soft", [
      "Entraide",
      "Persévérance",
      "Excellence",
    ]); // success
    expect(teamDev).toHaveProperty("skills.soft", "Excellence"); // failed : skills.soft contient un tableau et non pas une string
  });
  test("L'object teamDev2 possède les memes propriétés et valeurs que l'object teamDev", () => {
    expect(teamDev).toMatchObject(teamDev2);
  });
  test("le tableau d’objet a deux éléments, le premier élément a au moins une propriété a qui vaut 1 et un second élément qui a au moins une propriété b qui vaut 2", () => {
    expect([{ a: 1 }, { b: 2, c: 3 }]).toMatchObject([{ a: 1 }, { b: 2 }]);
  });
});

/*
**Les matchers pour les nombres**
Il existe des matchers pour vérifier que le nombre reçu est :
- plus grand que celui attendu (toBeGreaterThan()).
- plus grand ou égal à celui attendu (toBeGreaterThanOrEqual()).
- plus petit que celui attendu (toBeLessThan()).
- plus petit ou égal à celui attendu (toBeLessThanOrEqual()).
- toBeCloseTo() : va vérifier par défaut que la différence entre les deux nombres de types float est inférieure à 0.005
(précision de 2 chiffres après la virgule par défaut). Il prend optionnellement un deuxième argument permettant de passer la précision
de la comparaison (donc préciser le nombre de chiffres à vérifier après la virgule).
*/
describe.only("Les matchers pour les nombres", () => {
  const num1 = 0.1;
  const num2 = 0.2;
  const num3 = 10;
  const num4 = 20;

  test("Permet de vérifier les calculs entre nombres flottants", () => {
    expect(num1 + num2).toBeCloseTo(0.3, 5); // Verification sur 5 chiffres après la virgule
  });
  test("num4 est plus grand que num3", () => {
    expect(num4).toBeGreaterThanOrEqual(num3);
  });
});
