import { app } from "./app";
import { api } from "./api";

/*
**Mocker des modules**
L’exemple le plus classique est les tests de fonctions utilisant des requêtes HTTP. 
Si on a des dizaines ou centaines de fonctions asynchrones à tester, on ne va pas attendre que toutes ces fonctions fassent des requêtes !
Le temps d’exécution de nos tests serait trop long.

Il existe 3 façon de créer des mock function :
1. jest.fn() : syntaxe de base comme vu dans le cours précédent

2. jest.mock(): permet de mocker automatiquement toutes les fonctions d’un module que nous importons dans un fichier de test.
Dans notre exemple, nous importons le module axios et en utilisant jest.mock("axios") nous pouvons ensuite appeler une méthode
disponible sur les fonctions mock sur axios.get car cette fonction a été automatiquement transformée en fonction mock.

3. jest.spyon(firstParam, secondParam) : va automatiquement créer une fonction mock pour la méthode fetchAll
Le premier parametre est l'object que l'on va espionner : ici api
Le deuxieme parametre est la méthode que l'on souhaite espionner : "fetchAll"
La différence avec la méthode fn c'est qu'on va pouvoir réinitialiser l'implementation de base quand on aura fini notre test si on le souhaite.

**Mocker un retour de valeur**
Les fonctions mocks possèdent plusieurs méthodes permettant de mocker la valeur de retour.
Nous allons commencer par voir la méthode utilisée dans le dernier exemple, puis nous verrons les autres.

- mockResolvedValue() : mockResolvedValue() permet de simuler qu’une fonction mock retourne toujours une promesse résolue avec la valeur spécifiée.
Elle est exactement équivalente à : jest.fn().mockImplementation(() => Promise.resolve(valeur));
Dans notre exemple nous devons l’utiliser car nous exécutons le code suivant : return axios.get("/api/users").then(res => res.data);
--> then() ne peut s’exécuter que sur une promesse. Nous devons donc forcément retourner une promesse de notre fonction mock.

- mockResolvedValueOnce() : permet de simuler qu’une fonction mock retourne une promesse résolue avec la valeur spécifiée pour une exécution.
Cela permet de faire varier le retour d’une fonction mock en fonction du nombre d’exécution.
ex :
test('mock valeurs de retour asynchrones', async () => {
  const asyncMock = jest
    .fn()
    .mockResolvedValue('Valeur retournée par défaut')
    .mockResolvedValueOnce('Valeur retournée par la 1ère exécution')
    .mockResolvedValueOnce('Valeur retournée par la 2ème exécution');

  await asyncMock(); // Valeur retournée par la 1ère exécution
  await asyncMock(); // Valeur retournée par la 2ème exécution
  await asyncMock(); // Valeur retournée par défaut
  await asyncMock(); // Valeur retournée par défaut
});

- mockRejectedValue() : Ces méthodes permettent de simuler qu’une fonction mock retourne une promesse rejetée avec la valeur spécifiée.
Elle correspond à exactement à faire : jest.fn().mockImplementation(() => Promise.reject(value));
Nous pouvons ainsi simuler une erreur très facilement : const mock = jest.fn().mockRejectedValue(new Error('Erreur !'));

- mockRejectedValueOnce()

- mockReturnValue() && mockReturnValueOnce() : Ces méthodes permettent de retourner des valeurs depuis des fonctions mock, et ce de manière synchrone.
const monMock = jest.fn();
monMock.mockReturnValue(42);
*/

// 1ere façon de faire
test("should call function : first method", () => {
  const fakeData = [{ name: "tintin" }];
  api.fetchAll = jest.fn(); // on crée notre mock function
  api.fetchAll.mockResolvedValue(fakeData);
  const res = app.fetchUser();

  expect(api.fetchAll).toHaveBeenCalled();
  expect(api.fetchAll).toBeCalledWith("user");
  return expect(res).resolves.toEqual(fakeData);
});

/*
2eme façon de faire : remplacer directement toutes les méthode du fichier api par des fausses fonctions (fonctions simulés).
Ce qu'on pourrait faire, pour chaque mééthode du fichier api faire api.methode = jest.fn() mais c'est trop rébarbatif.
On va donc plutot utiliser jest.mock('./api) en mettant le nom du module en argument de la méthode mock() ainsi toutes les fonctions/methode
du fichier api vont etre mocké !
*/
test("should call function : second method", () => {
  jest.mock("./api");

  const fakeData: [{ name: string }] = [{ name: "tintin" }];
  api.fetchAll.mockResolvedValue(fakeData);
  const res = app.fetchUser();

  expect(api.fetchAll).toHaveBeenCalled();
  expect(api.fetchAll).toBeCalledWith("user");
  return expect(res).resolves.toEqual(fakeData);
});

/*
3eme façon de faire : utiliser jest.spyon(firstParam, secondParam). -> va automatiquement créer une fonction mock pour la méthode fetchAll
Le premier parametre est l'object que l'on va espionner : ici api
Le deuxieme parametre est la méthode que l'on souhaite espionner : "fetchAll"
La différence avec la méthode fn c'est qu'on va pouvoir réinitialiser l'implementation de base quand on aura fini notre test si on le souhaite.

*/
test("should call function : theard method", () => {
  const mock = jest.spyOn(api, "fetchAll");
  const fakeData = [{ name: "tintin" }];
  api.fetchAll.mockResolvedValue(fakeData);
  const res = app.fetchUser();

  //   mock.mockRestore(); // Si on réinitialise la function mock le test va failed car fetchAll ne sera pas appelé ! toHaveBeenCalled est 0

  expect(api.fetchAll).toHaveBeenCalled();
  expect(api.fetchAll).toBeCalledWith("user");
  return expect(res).resolves.toEqual(fakeData);
});

// Dernier exemple plus simple avec un cas fictif ressemblant à la réalité : fetching de data avec axios
import axios from "axios";

jest.mock("axios"); // Je transforme toutes les fonctions/méthodes contenu dans axios en mock function

class Users {
  static getAll() {
    return axios.get("/api/users").then((res) => res.data);
  }
}

test.only("récupérer les utilisateurs", () => {
  const users = [{ nom: "Jean" }, { nom: "Paul" }];
  const res = { data: users };
  // Nous faisons comme si la méthode get d'axios recevais res.
  const x = axios.get.mockResolvedValue(res);
  return Users.getAll().then((data) => expect(data).toEqual(users));
});
