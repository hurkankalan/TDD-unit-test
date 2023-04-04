"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const api_1 = require("./api");
/*
**Mocker des modules**
L’exemple le plus classique est les tests de fonctions utilisant des requêtes HTTP.
Si on a des dizaines ou centaines de fonctions asynchrones à tester, on ne va pas attendre que toutes ces fonctions fassent des requêtes !
Le temps d’exécution de nos tests serait trop long.
*/
// 1ere façon de faire
test("should call function", () => {
    api_1.api.fetchAll = jest.fn();
    const res = app_1.app.fetchUser();
    expect(api_1.api.fetchAll).toHaveBeenCalled();
    expect(api_1.api.fetchAll).toBeCalledWith("user");
});
