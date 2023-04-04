export function add(a: number, b: number, callback: (result: number) => void) {
  return callback(a + b);
}

export function forEach(liste: any, callback: any) {
  for (let index = 0; index < liste.length; index++) {
    callback(liste[index]);
  }
}
