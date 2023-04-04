"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const axios_1 = __importDefault(require("axios"));
class Users {
    static getAll() {
        return axios_1.default.get("/api/users").then((res) => res.data);
    }
}
exports.Users = Users;
