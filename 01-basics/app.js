console.log("Started");

setTimeout(() => console.log("Timer"), 0); // T2
setTimeout(() => console.log("Timer"), 0); // T3
setTimeout(() => console.log("Timer"), 0); // T2

Promise.resolve().then(() => console.log("Promise"));

console.log("Ended");

// Output - Started -> Ended -> Promise -> Timer (after 1.5s)

process.on("uncaughtException", () => {
  console.log("Catching the execption here...");
});

nonExistingFunction();
