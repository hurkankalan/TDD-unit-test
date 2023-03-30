export function add(a, b, callback) {
  // On va simuler l'asynchrone avec un setTimeOut()
  setTimeout(() => {
    callback(a + b);
  }, 1000);
}

export function addition(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}

export function addition2(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("error");
    }, 1000);
  });
}
