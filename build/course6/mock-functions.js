"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEach = exports.add = void 0;
function add(a, b, callback) {
    return callback(a + b);
}
exports.add = add;
function forEach(liste, callback) {
    for (let index = 0; index < liste.length; index++) {
        callback(liste[index]);
    }
}
exports.forEach = forEach;
