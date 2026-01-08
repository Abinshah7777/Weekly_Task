const myPromise = new Promise((resolve, reject) => {
  let success = true;

  success ? resolve("Success") : reject("Error");
});

myPromise
  .then(msg => console.log(msg))
  .catch(err => console.log(err));
