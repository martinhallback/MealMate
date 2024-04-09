//contact.js
function toggleAnswer(question) {
    var answer = question.nextElementSibling;
    if (answer.style.display === "block") {
      answer.style.display = "none";
      question.classList.remove("opened");
    } else {
      answer.style.display = "block";
      question.classList.add("opened");
    }
  }
