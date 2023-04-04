import { api } from "./api";

class App {
  async fetchUser() {
    return await api.fetchAll("user");
  }
}

export const app = new App();
