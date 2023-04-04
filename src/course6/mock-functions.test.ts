import { add, forEach } from "./mock-functions";

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

On peut simuler une valeur de retour de 2 manières :
- Simuler une valeur directement dans la méthode fn : const func = jest.fn(() => 'Hello world');
- Simuler une méthode via la méthode mockReturnValue() : func.mockReturnValue('Hello world');
- Simuler une méthode via la méthode mockReturnValueOnce() uniquement pour le premier appel : func.mockReturnValue(24);
- Simuler une valeur via la méthode mockImplementation() : func.mockImplementation('Hello World') c'est la meme chose que de faire 
const func = jest.fn(() => 'Hello world');
- Simuler une méthode via la méthode mockImplementationOnce() uniquement pour le premier appel : func.mockImplementationOnce('Hello World');

**Les matchers pour les mock functions**
- toHaveBeenCalled()
- toHaveBeenCalledTimes()
- toHaveBeenCalledWith()
- toHaveBeenLastCalledWith()
- toHaveBeenNthCalledWith()
- toHaveReturned()
- toHaveReturnedTimes()
- toHaveReturnedWith()
- toHaveLastReturnedWith()
- toHaveNthReturnedWith()
*/

describe("mock functions lesson", () => {
  test("should call function", () => {
    const func = jest.fn();
    func.mockReturnValueOnce("SUUUUUUUU");
    func.mockReturnValue(24);

    func("Hello", "World");
    func(24);
    func(false);

    console.log(func.mock.calls); // [[ 'Hello', 'World' ], [ 24 ], [ false ]] car on récupère 3 fois les arguments reçus par notre function, car appelé 3 fois
    console.log(func.mock.calls.length); // 3 car on récupère le nombre de fois ou ma fonction func a été appelé
    console.log(func.mock.calls[0]); // [ 'Hello', 'World' ] car on récupère le premier element de notre tableau de calls
    console.log(func.mock.calls[0][0]); // Hello car car on récupère le premier element de notre premier tableau de tableau de calls

    console.log(func.mock.results); // [{ type: 'return', value: 'SUUUUUUUU' }, { type: 'return', value: 24 }, { type: 'return', value: 24 }] car on récupère toutes les valeurs de retours de notre function func
  });
});

describe("mock functions examples", () => {
  test("should call function return right value", () => {
    const func = jest.fn();
    func.mockImplementationOnce(() => true);
    func.mockImplementation(() => 0); // Cette valeur de retour est écrasé par le fait que l'on redéfinit une nouvelle valeur de retour ci dessous à mockImplementation()
    func.mockImplementation(() => false);

    func();
    func();
    func();

    expect(func.mock.results[0].value).toBe(true);
    expect(func.mock.results[1].value).toBe(false);
    expect(func.mock.results[2].value).toBe(false);
    expect(func.mock.calls.length).toBe(3);

    func();

    expect(func.mock.calls.length).toBe(4);
    expect(func.mock.calls[0].value).toBe(undefined);
  });
});

describe("mock functions examples with promise", () => {
  test("should be promise resolved", () => {
    const func = jest.fn();

    func.mockResolvedValue("Promise is resolved !");

    func();

    expect(func.mock.calls[0]).toEqual([]);
    return expect(func.mock.results[0].value).resolves.toBe(
      "Promise is resolved !"
    ); // La promesse est bien résolue et renvoie la value "Promise is resolved !" (ne pas oublier de mettre return car on test une async func !)
  });
});

describe("mock functions with add function", () => {
  test("should be return right callback value", () => {
    const func = jest.fn();
    add(1, 1, func);

    expect(func.mock.calls.length).toBe(1); // Il a été appelé une fois
    expect(func.mock.calls[0][0]).toBe(2); // func est bien egal à 2

    expect(func).toBeCalled(); // test passed car la function func a bien été call
    expect(func).toBeCalledWith(2); // test passed car la function func a été call et le resultat donne 2
    expect(func).toBeCalledTimes(1); // test passed car la function func a été call une fois
  });
});

test("test de la fonction forEach", () => {
  // Nous créons un mock pour l'utiliser en fonction de rappel
  const monMock = jest.fn((x) => 42 * x);
  forEach([0, 1], monMock);
  expect(monMock).toHaveBeenCalledTimes(2);

  // Nous testons les arguments passés à notre fonction forEach
  expect(monMock).toHaveBeenNthCalledWith(1, 0);
  expect(monMock).toHaveBeenNthCalledWith(2, 1);

  // Nous testons les valeurs de retour
  expect(monMock).toHaveNthReturnedWith(1, 0);
  expect(monMock).toHaveNthReturnedWith(2, 42);
});
