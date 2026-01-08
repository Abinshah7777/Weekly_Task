function sayHelloPromise() {
  return new Promise(resolve => {
    resolve("Hello from Promise");
  });
}

sayHelloPromise().then(msg => console.log(msg));
