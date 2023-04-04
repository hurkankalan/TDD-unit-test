"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addition2 = exports.addition = exports.add = void 0;
function add(a, b, callback) {
    // On va simuler l'asynchrone avec un setTimeOut()
    setTimeout(() => {
        callback(a + b);
    }, 1000);
}
exports.add = add;
function addition(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000);
    });
}
exports.addition = addition;
function addition2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("error");
        }, 1000);
    });
}
exports.addition2 = addition2;
