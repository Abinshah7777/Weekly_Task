function completeAssignment(topic, callback) {
  console.log("Working on assignment: " + topic);

  setTimeout(() => {
    console.log("Assignment completed!");
    callback();
  }, 3000);
}

function submitAssignment() {
  console.log("Assignment submitted successfully 📩");
}

completeAssignment("Asynchronous JavaScript", submitAssignment);
