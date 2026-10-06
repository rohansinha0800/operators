const operatorTypes = [
  {
    name: "Arithmetic Operators",
    icon: "+",
    symbols: "+  -  *  /  %",
    summary: "Use two numbers to add, subtract, multiply, divide, or find a remainder.",
    demo: "12 + 5",
    demoResult: "17",
    definition: "Use two numbers to add, subtract, multiply, divide, or find the remainder.",
    example: "int result = 10 % 3;",
    output: "1",
    tip: "Like splitting 10 cookies between 3 friends: the remainder is 1 cookie."
  },
  {
    name: "Relational Operators",
    icon: "<",
    symbols: "<  >  <=  >=  ==  !=",
    summary: "Compare two values. The result tells us whether the comparison is true or false.",
    demo: "8 >= 5",
    demoResult: "true (1)",
    definition: "Compare two values. The answer is either true (1) or false (0).",
    example: "int result = 5 < 8;",
    output: "1 (true)",
    tip: "Like checking whether your age meets a minimum requirement."
  },
  {
    name: "Logical Operators",
    icon: "&&",
    symbols: "&&  ||",
    summary: "Join two true-or-false conditions with AND (&&) or OR (||).",
    demo: "(1 == 1) && (2 > 1)",
    demoResult: "true (1)",
    definition: "Combine two true/false conditions: && means AND, and || means OR.",
    example: "int result = (5 > 2) && (3 < 4);",
    output: "1 (true)",
    tip: "Like needing both a ticket AND an ID to enter."
  },
  {
    name: "Assignment Operators",
    icon: "=",
    symbols: "=  +=  -=  *=  /=  %=",
    summary: "Put a value into a variable, or update its current value using a shortcut.",
    demo: "score += 2",
    demoResult: "adds 2 to score",
    definition: "Store a value in a variable. Shortcuts such as += update it too.",
    example: "int score = 5;\nscore += 2;",
    output: "score is 7",
    tip: "Think of = as putting a value into a labelled box."
  },
  {
    name: "Bitwise Operators",
    icon: "&",
    symbols: "&  |  ^  <<  >>",
    summary: "Compare or shift the binary 0s and 1s inside two whole numbers.",
    demo: "0101 & 0011",
    demoResult: "0001 (1)",
    definition: "Work with two integers one bit at a time. Each bit is a 0 or a 1.",
    example: "int result = 5 & 3;",
    output: "1",
    tip: "5 is 101 and 3 is 011 in binary. AND keeps only the bit that is 1 in both."
  }
];

const operatorGrid = document.querySelector("#operator-grid");
const operatorDetail = document.querySelector("#operator-detail");

operatorTypes.forEach((item, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "operator-card";
  button.setAttribute("aria-pressed", "false");
  button.setAttribute("aria-controls", "operator-detail");
  button.innerHTML = `
    <span class="card-topline"><span class="operator-icon-small">${item.icon}</span><span class="card-index">0${index + 1} / 05</span></span>
    <span class="operator-card-title"><span class="card-arrow" aria-hidden="true">↗</span><h3>${item.name}</h3></span>
    <span class="card-summary">${item.summary}</span>
    <span class="card-example"><code>${item.demo}</code><span class="card-example-result">${item.demoResult}</span></span>`;
  button.addEventListener("click", () => showOperator(index, button));
  operatorGrid.append(button);
});

function showOperator(index, selectedButton) {
  const item = operatorTypes[index];
  operatorGrid.querySelectorAll(".operator-card").forEach((card) => card.setAttribute("aria-pressed", String(card === selectedButton)));
  operatorDetail.innerHTML = `
    <article class="detail-content">
      <div class="detail-overview">
        <p class="detail-label">THE IDEA</p>
        <h3>${item.name}</h3>
        <p>${item.definition}</p>
      </div>
      <div>
        <p class="detail-label">SYMBOLS</p>
        <p class="detail-symbols">${item.symbols}</p>
        <p class="detail-label" style="margin-top:17px">IN REAL LIFE</p>
        <p class="detail-tip">${item.tip}</p>
      </div>
      <div>
        <p class="detail-label">A LITTLE C EXAMPLE</p>
        <div class="detail-code">${item.example}<br><span class="detail-output">→ ${item.output}</span></div>
      </div>
    </article>`;
}

const valueA = document.querySelector("#value-a");
const valueB = document.querySelector("#value-b");
const calcResult = document.querySelector("#calc-result");
const calcMessage = document.querySelector("#calc-message");
const calcError = document.querySelector("#calc-error");
const codeA = document.querySelector("#code-a");
const codeB = document.querySelector("#code-b");
const codeOperation = document.querySelector("#code-op");
let selectedOperation = "+";

function calculate() {
  const a = Number(valueA.value);
  const b = Number(valueB.value);
  codeA.textContent = valueA.value || "0";
  codeB.textContent = valueB.value || "0";
  codeOperation.textContent = selectedOperation;
  calcError.textContent = "";

  if (valueA.value.trim() === "" || valueB.value.trim() === "" || !Number.isFinite(a) || !Number.isFinite(b)) {
    calcResult.textContent = "—";
    calcMessage.textContent = "Enter two valid numbers.";
    calcError.textContent = "Both boxes need a valid number.";
    return;
  }

  let result;
  switch (selectedOperation) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/":
      if (b === 0) {
        calcResult.textContent = "—";
        calcMessage.textContent = "Division by zero is undefined.";
        calcError.textContent = "Choose a non-zero second value to divide.";
        return;
      }
      result = Number.isInteger(a) && Number.isInteger(b) ? Math.trunc(a / b) : a / b;
      break;
    case "%":
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        calcResult.textContent = "—";
        calcMessage.textContent = "Remainder needs whole numbers.";
        calcError.textContent = "The % operator works with integers in C.";
        return;
      }
      if (b === 0) {
        calcResult.textContent = "—";
        calcMessage.textContent = "Remainder by zero is undefined.";
        calcError.textContent = "Choose a non-zero second value for remainder.";
        return;
      }
      result = a % b;
      break;
    default: return;
  }

  const displayResult = Number.isFinite(result) ? Number(result.toPrecision(10)).toString() : "—";
  calcResult.textContent = displayResult;
  calcMessage.textContent = "That’s the answer!";
}

valueA.addEventListener("input", calculate);
valueB.addEventListener("input", calculate);
document.querySelectorAll(".operation-button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedOperation = button.dataset.operation;
    document.querySelectorAll(".operation-button").forEach((operationButton) => {
      operationButton.classList.toggle("selected", operationButton === button);
      operationButton.setAttribute("aria-pressed", String(operationButton === button));
    });
    calculate();
  });
  button.setAttribute("aria-pressed", String(button.dataset.operation === selectedOperation));
});

const quizForm = document.querySelector("#quiz-form");
const quizResult = document.querySelector("#quiz-result");
const correctAnswers = { q1: "b", q2: "c", q3: "a", q4: "a", q5: "a" };

Object.entries(correctAnswers).forEach(([question, answer]) => {
  const fieldset = quizForm.querySelector(`[data-question="${question}"]`);
  const feedback = document.createElement("p");
  feedback.className = "quiz-feedback";
  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");
  fieldset.append(feedback);

  fieldset.querySelectorAll(`input[name="${question}"]`).forEach((input) => {
    input.addEventListener("change", () => {
      fieldset.classList.remove("is-correct", "is-incorrect");
      fieldset.querySelectorAll(".answer-option").forEach((label) => label.classList.remove("is-correct", "is-selected"));

      const selectedOption = input.closest(".answer-option");
      const correctOption = fieldset.querySelector(`input[value="${answer}"]`).closest(".answer-option");
      if (input.value === answer) {
        fieldset.classList.add("is-correct");
        selectedOption.classList.add("is-correct");
        feedback.textContent = "Correct!";
      } else {
        fieldset.classList.add("is-incorrect");
        selectedOption.classList.add("is-selected");
        correctOption.classList.add("is-correct");
        const correctText = correctOption.querySelector("span:last-child").textContent.trim();
        feedback.textContent = `Wrong — the correct answer is ${correctText}.`;
      }
    });
  });
});

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let score = 0;
  let answered = 0;

  Object.entries(correctAnswers).forEach(([question, answer]) => {
    const fieldset = quizForm.querySelector(`[data-question="${question}"]`);
    const selected = quizForm.querySelector(`input[name="${question}"]:checked`);
    fieldset.classList.remove("is-correct", "is-incorrect");
    fieldset.querySelectorAll(".answer-option").forEach((label) => label.classList.remove("is-correct", "is-selected"));
    const correctOption = fieldset.querySelector(`input[value="${answer}"]`).closest(".answer-option");
    correctOption.classList.add("is-correct");
    if (selected) {
      answered++;
      const selectedOption = selected.closest(".answer-option");
      if (selected.value === answer) {
        score++;
        fieldset.classList.add("is-correct");
      } else {
        fieldset.classList.add("is-incorrect");
        selectedOption.classList.add("is-selected");
      }
    }
  });

  const encouragement = score === 5 ? "Perfect score — you’ve got this!" : score >= 3 ? "Nice work — you’re getting the hang of it." : "Good start — review the cards and give it another go.";
  quizResult.innerHTML = `<strong>${score} out of 5 correct.</strong> ${encouragement}<small>${answered < 5 ? `You answered ${answered} of 5. Correct answers are highlighted above.` : "Correct answers are highlighted above."}</small>`;
  quizResult.classList.add("visible");
});

quizForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    quizForm.querySelectorAll(".quiz-question").forEach((fieldset) => {
      fieldset.classList.remove("is-correct", "is-incorrect");
      fieldset.querySelectorAll(".answer-option").forEach((label) => label.classList.remove("is-correct", "is-selected"));
      fieldset.querySelector(".quiz-feedback").textContent = "";
    });
    quizResult.classList.remove("visible");
    quizResult.textContent = "";
  }, 0);
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const navLinks = [...document.querySelectorAll(".nav-link")];
const observedSections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-25% 0px -65% 0px" });
  observedSections.forEach((section) => sectionObserver.observe(section));
}
