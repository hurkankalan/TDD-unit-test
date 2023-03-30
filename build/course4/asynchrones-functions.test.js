"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const asynchrones_functions_1 = require("./asynchrones-functions");
/*
**Les tests des fonctions asynchrones**
Lorsqu'on test une fonction asynchrone, le test peut s'executter et passer en success (sans etre failed) car il se peut que l'appel et
l'execution de la fonction soit en cours et donc toujours pas terminé.
JS va passer à la suite du code en attendant que la promise soit resolve ou rejected.
Arrivé à la fin du test, on peut avoir la fin et le success d'un test alors que la fonction n'a meme pas été testé.
Voir le test("should be 3") ci-dessous qui est passed alors qu'elle est erroné :
le test est fini avant l'execution de la function add et donc Jest return un test success car il n'y a pas eu d'erreur
--> Si on retourne une promesse, Jest attendra qu'elle soit terminée (settled) pour finir le test, si pas de return elle finira sans avoir tester !!
La solution est d'utiliser un parametre done en deuxieme argument de la fonction it pour definir le moment et l'endroit de la fin d'un test
PS : A la fin de ce cours tout en bas, il y aura la meilleur facon de le faire avec le cas then/catch et le cas async/await
*/
// Le test est passed alors qu'il devrait failed :
it("should be 3", () => {
    const callback = (res) => {
        expect(res).toBe(50);
    };
    (0, asynchrones_functions_1.add)(1, 2, callback);
});
/*
Le test est failed comme prévu : 1 + 2 donne comme résultat 3 et non pas 50
Si on passe le done en argument d'un test, il faut impérativement l'invoquer pour terminer le test sinon Jest va attendre
jusqu'au timeout du test.
*/
test("should be 3", (done) => {
    const cb = (res) => {
        expect(res).toBe(50);
        done();
    };
    (0, asynchrones_functions_1.add)(1, 2, cb);
});
/*
Si on return quelque chose, js va attendre le retour de la promise car elle est return avant de continuer la suite des tests.
Donc le test ne sera pas finalisé grace au mot clé return. Si pas de return, le test seras passed quelque soit le result de la promise
car elle ne va meme pas attendre la reponse avant de finir le test
*/
it("should be 2", () => {
    return (0, asynchrones_functions_1.addition)(1, 1).then((res) => {
        expect(res).toBe(2);
    });
});
// Le test est passed
it("should be error", () => {
    return (0, asynchrones_functions_1.addition2)().catch((error) => expect(error).toBe("error"));
});
/*
Idem que l'exemple précédent mais plutot que de retourner une promise à partir de la fonction, on va directement return l'expect
de la function asynchrone et utiliser le matcher reject ou resolve dessus.
--> dans l'exemple ci-dessous, le reject va attendre que la function asynchrone add() se termine, va extraire l'error qui a été reject
par la function add() et on va ensuite pouvoir faire la comparaison de l'error qu'on a indiqué avec celle attendu avec .tobe()
*/
it("should be error", () => {
    return expect((0, asynchrones_functions_1.addition2)()).rejects.toBe("error");
});
/*
De la même manière qu'en haut mais en mode resolve
Si on retourne une promesse, Jest attendra qu'elle soit terminée (settled) pour finir le test, si pas de return elle finira sans avoir tester !!
*/
it("Shoulde be 100", () => {
    return expect((0, asynchrones_functions_1.addition)(50, 50)).resolves.toBe(100);
});
/*
La meilleur façon moderne de tester une promise aved async/await : on peut enlever le return car await va attendre le retour de la promise
avant de continuer le test
*/
it("Shoulde be 200", () => __awaiter(void 0, void 0, void 0, function* () {
    //   await expect(addition(50, 50)).resolves.toBe(100); Ca fonctionne mais c'est mioeux de stocker dans une variable
    const res = yield (0, asynchrones_functions_1.addition)(100, 100);
    expect(res).toBe(200);
}));
/*
Meme cas mais si on veut tester avec des try/catch
*/
it.only("Should be 24", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, asynchrones_functions_1.addition)(12, 12);
    }
    catch (error) { }
}));
