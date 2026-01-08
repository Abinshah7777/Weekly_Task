function getData() {
  return new Promise((resolve, reject) => {
    let ok = true;
    ok ? resolve("Data received") : reject("Failed");
  });
}

async function run() {
  try {
    const result = await getData();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run();