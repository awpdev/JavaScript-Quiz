const questions = [{
  question: 'Which symbol performs the Boolean OR logical expression?',
  choices: ['a. &&', 'b. ||', 'c. !!', 'd. ==='],
  correctAnswer: '1'
}, {
  question: 'What is the term used to describe the moving of variables and functions to the top of their scope on where it is defined?',
  choices: ['a. hoisting', 'b. nesting', 'c. inheritance', 'd. conditional'],
  correctAnswer: '0'
}, {
  question: 'What is the benefit of using modules?',
  choices: ['a. Maintainability', 'b. Reusability', 'c. Namespacing', 'd. All of the above'],
  correctAnswer: '3'
}, {
  question: 'Which of the following is not considered a JavaScript operator?',
  choices: ['a. new', 'b. this', 'c. delete', 'd. typeof'],
  correctAnswer: '1'
}, {
  question: 'The _______ method of an Array object adds and/or removes elements from an array.',
  choices: ['a. Reverse', 'b. Shift', 'c. Slice', 'd. Splice'],
  correctAnswer: '3'
}, {
  question: 'Inside which HTML element do we put the JavaScript?',
  choices: ['a. <js>', 'b. <scripting>', 'c. <script>', 'd. <javascript>'],
  correctAnswer: '2'
}, {
  question: 'Which of the following best describes JavaScript?',
  choices: ['a. a low-level programming language', 'b. a scripting language precompiled in the browser', 'c. a compiled scripting language', 'd. an object-oriented scripting language'],
  correctAnswer: '3'
}, {
  question: "What does 'this' keyword mean in JavaScript?",
  choices: ['a. It refers current object', 'b. If refers previous object', 'c. It is variable which contains value', 'd. None of the above'],
  correctAnswer: '0'
}, {
  question: "Which of the following is not a valid JavaScript variable name?",
  choices: ['a. 2names', 'b. _first_and_last_names', 'c. FirstAndLast', 'd. None of the above'],
  correctAnswer: '0'
}, {
  question: "Which of the following event fires when the form element loses the focus: <button>, <input>, <label>, <select>, <textarea>?",
  choices: ['a. onfocus', 'b. onblur', 'c. onclick', 'd. ondblclick'],
  correctAnswer: '1'
}, {
  question: "The syntax of capture events method for document object is _____.",
  choices: ['a. captureEvents()', 'b. captureEvents(args eventType)', 'c. captureEvents(eventType)', 'd. captureEvents(eventVal)'],
  correctAnswer: '3'
}, {
  question: "RxJS stands for _______ Extensions for JavaScript",
  choices: ['a. Recursive', 'b. Relational', 'c. Reactive', 'd. Registration'],
  correctAnswer: '2'
}, {
  question: "AJAX stands for _______ JavaScript and XML",
  choices: ['a. Asynchronous', 'b. Additional', 'c. Associative', 'd. Applied'],
  correctAnswer: '0'
}, {
  question: "String, number, and null are examples of _______ data types",
  choices: ['a. prime', 'b. complex', 'c. immutable', 'd. primitive'],
  correctAnswer: '3'
}, {
  question: "What is the purpose of freeze method?",
  choices: ['a. to make an object immutable', 'b. to handle errors', 'c. to compare variables', 'd. to retrieve string'],
  correctAnswer: '0'
}, {
  question: "Which types of image maps can be used with JavaScript?",
  choices: ['a. Server-side image maps', 'b. Client-side image maps', 'c. Server-side image maps and Client-side image maps', 'd. none of the above'],
  correctAnswer: '1'
}];

  let timeEl = document.querySelector('.time');
  let viewScoresBtnNavEl = document.querySelector('#view-high-scores-nav-button');

  const startContainerEl = document.querySelector('#start-container');
  const startQuizBtnEl = document.querySelector('#start-quiz-button');

  const quizContainerEl = document.querySelector('#quiz-container');
  const questionEl = document.querySelector('#question');
  const aBtnEl = document.querySelector('#btn-A');
  const bBtnEl = document.querySelector('#btn-B');
  const cBtnEl = document.querySelector('#btn-C');
  const dBtnEl = document.querySelector('#btn-D');
  const resultEl = document.querySelector('#result');
  let scoreEl = document.querySelector('#score');
  const userInitialsInputEl = document.querySelector('#user-initials-input');
  const saveInitialsBtnEl = document.querySelector('#save-initials-button');
  const goBackBtnEl = document.querySelector('#go-back-button');
  const clearScoresBtnEl = document.querySelector('#clear-scores-button');

  const highScoresContainerEl = document.querySelector('#high-scores-container');
  const initialsInputEl = document.querySelector('#initials');
  const highScoresListEl = document.querySelector('#high-scores-list');

  const resultContainerEl = document.querySelector('#result-container');


  let secondsLeft = 75;
  let questionCt; // current number of questions in session
  const MAX_QUESTIONS = 10; // max number of questions per session
  let lastScore;
  //let scores = [];
  let randomNum;

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  function setTime() {
    let timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = 'Time Remaining: ' + secondsLeft;
      if (secondsLeft <= 0 || questionCt === MAX_QUESTIONS) {
        clearInterval(timerInterval);
        endQuiz();
      }

    }, 1000);
  }

  function startScreen() {
    secondsLeft = 75;
    highScoresContainerEl.style.display = 'none';
    startContainerEl.style.display = 'block';
    timeEl.textContent = 'Time Remaining: ' + secondsLeft;
  }

  function startQuiz() {
    startContainerEl.style.display = 'none';
    quizContainerEl.style.display = 'block';
    questionCt = 0;
    setTime();
    askQuestion(questionCt);
  }

  // random function used to randomize displayed questions
  function randomIndex(n) {
    return Math.floor(Math.random() * parseInt(n));
  }

  function askQuestion(n) {
    if (n < 10) {
      //console.log(randomNum);
      randomNum = randomIndex(questions.length);
      questionEl.textContent = questions[randomNum].question;
      aBtnEl.textContent = questions[randomNum].choices[0];
      bBtnEl.textContent = questions[randomNum].choices[1];
      cBtnEl.textContent = questions[randomNum].choices[2];
      dBtnEl.textContent = questions[randomNum].choices[3];
    }
  }

  function endQuiz() {
    scoreEl.textContent = secondsLeft;
    lastScore = secondsLeft;
    quizContainerEl.style.display = 'none';
    resultContainerEl.style.display = 'block';
  }

  function checkUserChoice(event) {
    event.preventDefault();
    resultEl.style.display = 'block';
    let res = document.createElement('p');

    if (questions[randomNum].correctAnswer === event.target.value) {
      secondsLeft += 5;
      res.textContent = 'Correct!';
    } else {
      secondsLeft -= 10;
      res.textContent = 'Wrong!';
    }
    resultEl.appendChild(res);

    setTimeout(function() {
      res.style.display = 'none';
    }, 1000);

    questionCt++;

    askQuestion(questionCt);
  }
  

  function displayScores() {
    startContainerEl.style.display = 'none';
    quizContainerEl.style.display = 'none';
    resultContainerEl.style.display = 'none';
    highScoresContainerEl.style.display = 'block';

    highScoresListEl.innerHTML = "";
    if (highScores) {
      for (let i = 0; i < highScores.length; i++) {
        let scr = document.createElement('li');
        scr.textContent = highScores[i].initials + ' - ' + highScores[i].score;
        highScoresListEl.append(scr);
      }
    }
  }

  function saveInitials(event) {
    event.preventDefault();
    resultContainerEl.style.display = 'none';
    highScoresContainerEl.style.display = 'block';

    let inits = userInitialsInputEl.value.split('');
    inits.splice(3);
    inits = inits.join('');
    console.log(inits);
    //inits = inits.;
    console.log(questions.length);

    const score = {
      initials: inits,
      score: lastScore
    };
    //console.log(lastScore);
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));

    displayScores();

    console.log(highScores);
  }

  function clearScores() {
    window.localStorage.clear();
    highScoresListEl.innerHTML = "";
  }

  //viewHighScores.addEventListener("click", displayScores);


/*
  function openModal() {
    backdropEl.style.display = 'block';
    enterInitialsModalEl.classList.remove('hide');
    enterInitialsModalEl.classList.add('show');

  }

  function closeModal() {
    backdropEl.style.display = 'none';
    enterInitialsModalEl.classList.remove('show')
    enterInitialsModalEl.classList.add('hide');
  } */

  //viewScoresBtnNavEl.addEventListener('click', )

  startQuizBtnEl.addEventListener('click', startQuiz);

  aBtnEl.addEventListener('click', checkUserChoice);
  bBtnEl.addEventListener('click', checkUserChoice);
  cBtnEl.addEventListener('click', checkUserChoice);
  dBtnEl.addEventListener('click', checkUserChoice);
  
  goBackBtnEl.addEventListener('click', startScreen);

  saveInitialsBtnEl.addEventListener('click', saveInitials);

  userInitialsInputEl.addEventListener('keyup', function() {
    saveInitialsBtnEl.disabled = !userInitialsInputEl.value;
  });

  clearScoresBtnEl.addEventListener('click', clearScores);

  viewScoresBtnNavEl.addEventListener('click', displayScores)