class Api {
  async fetchAll(ressource: string): Promise<object[]> {
    const response = await fetch("https://monapi.fr/" + ressource);
    console.log(response.json);
    return response.json();
  }
}

export const api = new Api();
