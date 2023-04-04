export function add(
  a: number,
  b: number,
  callback: (result: number) => void
): void {
  // On va simuler l'asynchrone avec un setTimeOut()
  setTimeout(() => {
    callback(a + b);
  }, 1000);
}

export function addition(a: number, b: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}

export function addition2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("error");
    }, 1000);
  });
}
