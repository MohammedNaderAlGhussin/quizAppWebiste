// Select Elements
const count = document.querySelector(".count");
const catergory = document.querySelector(".category");
const bulletsAndTime = document.querySelector(".bullet-timer");
const bulltesContainer = document.querySelector(".bullets-container");
const quizArea = document.querySelector(".quiz-area");
const answersArea = document.querySelector(".answers-area");
const submitBtn = document.querySelector(".submit-btn");
const countDownElement = document.querySelector(".count-down");
const resultsContainer = document.querySelector(".reults-container");

// Declaring An Array And Push The Random Question

let arr = [];
// Inital Value Of Data Showed In The Page
let currentIndex = 0;
// Number Of Right Answer
let rightAnswers = 0;
// Count Down Time
let countDownInterval;

// Get The Data From Local Storage And Convert It Into A JS OBJ
let data = JSON.parse(window.localStorage.getItem("data"));
if (data) {
  getData(data);
}

async function getData(json) {
  try {
    const jsonObj = json.choosenObj;
    const jsonCount = json.choosenCount;
    const jsonDiffculty = json.choosenDiff;
    const jsonText = json.choosenText;
    const categoryobj = await (await fetch(`./JSON/${jsonObj}`)).json();

    catergory.innerHTML = jsonText;

    // Get A Random Questions From The CategoryObj And Pust It To The Array
    pushQuestionsToArray(categoryobj, jsonCount);
    // Creating Bulltes + Set The Questions Number
    createBulltes(jsonCount);
    // Add Data To The Page
    addDataToPage(arr[currentIndex], jsonCount);
    // Count Down Function
    countDown(jsonDiffculty, jsonCount, jsonText);
    // Click on Submit
    submitBtn.addEventListener("click", () => {
      const theRightAnswer = arr[currentIndex].right_answer;
      // Increase Index
      currentIndex++;
      // Check Answer Function
      checkAnswer(theRightAnswer);
      // Remove Prevoius Question
      quizArea.innerHTML = "";
      answersArea.innerHTML = "";
      // Add Data To The Page
      addDataToPage(arr[currentIndex], jsonCount);
      // Handel Bullets Class
      handelBulletsClass();
      // To Convert The JsonCount Into A Number
      if (currentIndex === parseInt(jsonCount)) {
        clearInterval(countDownInterval);
        showResult(jsonCount, jsonText);
      }
    });
  } catch (error) {
    return error;
  }
}
// Adding The  JsonObjects To The Array
function pushQuestionsToArray(obj, count) {
  for (let i = 0; i < count; i++) {
    // let random = obj[Math.floor(Math.random() * obj.length)];
    arr.push(obj[i]);
  }
  shuffleArray(arr);
}

// This function Will Change The Order Of The Array Objects
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function addDataToPage(obj, count) {
  // If The Cuerrent index less than the length of Object then Apply The Condition else Do Nothing
  if (currentIndex < count) {
    // Create H2 Question
    let questionTitle = document.createElement("h2");
    // Create Question Text
    let questionText = document.createTextNode(obj.title);
    // Disable Selecting The Question Title
    questionTitle.classList.add("select-none");
    // Appened The Text To The Title
    questionTitle.appendChild(questionText);
    // Append Title To Quiz Area
    quizArea.appendChild(questionTitle);
    // Create The Answer  Radio + Label
    for (let i = 1; i <= 4; i++) {
      // Create The Main Div  (Answers Container)
      let mainDiv = document.createElement("div");
      // Add Class To Main Div
      mainDiv.className = "answer";
      // Remove The Border From The Last Div
      if (i === 4) {
        mainDiv.classList.add("border-none");
      }
      // Create Radio Input
      let radioInput = document.createElement("input");
      // Add Type + name + id + Data-Attribute
      radioInput.type = "radio";
      radioInput.name = "questions";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];
      // Make First Answer Automaticlly Selected
      if (i === 1) {
        radioInput.checked = true;
      }
      // Create The Label
      let theLabel = document.createElement("label");
      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;
      // Add Class To The Label
      theLabel.className = "label-answer";
      // Create The Label Text Node
      let labelText = document.createTextNode(obj[`answer_${i}`]);
      // Apped The Text To The Label
      theLabel.append(labelText);

      // Appened Radio + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Appened Main Div To The Answers Area
      answersArea.append(mainDiv);
    }
  }
}

function createBulltes(numOfQuestions) {
  count.innerHTML = numOfQuestions;
  // Create Spans
  for (let i = 0; i < numOfQuestions; i++) {
    // Create Span
    let theBullet = document.createElement("span");
    // Add bullet Class To The Bullet
    theBullet.className = "bullet";
    // Check If I Am In The First Question
    if (i === 0) {
      theBullet.classList.add("on");
    }
    // Appened Bulltes To Bullets Container
    bulltesContainer.appendChild(theBullet);
  }
}

function checkAnswer(rAnswer) {
  let answers = document.getElementsByName("questions");
  let theChoosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}
function handelBulletsClass() {
  const bullets = document.querySelectorAll(".bullets-container span");
  let arrayOfBullets = Array.from(bullets);
  arrayOfBullets.forEach((bullet, index) => {
    if (currentIndex === index) {
      bullet.classList.add("on");
    }
  });
}
function countDown(duration, count, objText) {
  duration = duration * 60;
  if (currentIndex < count) {
    let mintues, seconds;
    countDownInterval = setInterval(() => {
      mintues = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      mintues = mintues <= 10 ? `0${mintues}` : mintues;
      seconds = seconds <= 10 ? `0${seconds}` : seconds;

      countDownElement.innerHTML = `${mintues}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countDownInterval);
        showResult(count, objText);
      }
    }, 1000);
  }
}

function showResult(count, objText) {
  // Clearing The Quiz Dom
  quizArea.remove();
  answersArea.remove();
  submitBtn.remove();
  bulletsAndTime.remove();
  // Handeling The Result Container
  let theResult = document.createElement("div");
  // Create The Restart Btn
  let restartBtn = document.createElement("button");
  let restartBtnText = document.createTextNode(
    "Thanks For Taking The Quizz. One More Time ?"
  );
  restartBtn.className = "restart";
  restartBtn.appendChild(restartBtnText);

  restartBtn.onclick = function () {
    window.localStorage.removeItem("data");
    window.location.href = "./index.html";
  };

  if (objText === "League of Legends") {
    rightAnswers === parseInt(count)
      ? (theResult.innerHTML = `<span class="perfect">You Are A Very Good Leauge Player, Proud Of You.</span><br> All Of The <b>${count}</b> Answer Were Correct.`)
      : rightAnswers > count / 2 && rightAnswers < count
      ? (theResult.innerHTML = `
      <span class="good">Not Bad, You Are On Ok Leauge Player.</span><br> You Have Answered <b>${rightAnswers}</b> From <b>${count}</b> Questions.
      `)
      : rightAnswers < count / 2
      ? (theResult.innerHTML = `<span class="bad">You Are A Trash League Player, Do Us A Favor And Delete The Game.</span><br> You Have Answered <b>${rightAnswers}</b> From <b>${count}</b> Questions. <br> <a href="https://www.youtube.com/watch?v=_QkKOTsW8jk" class="trash" target="_blank">CLick Me!</a>`)
      : "";
  } else if (objText === "HTML") {
    rightAnswers > count / 2 && rightAnswers < count
      ? (theResult.innerHTML = `
      <span class="good">Not Bad, You Have Some Knowledge.</span><br> You Have Answered <b>${rightAnswers}</b> From <b>${count}</b> Questions.
      `)
      : rightAnswers === parseInt(count)
      ? (theResult.innerHTML = `<span class="perfect">You Are An Expret In HTML, Proud Of You.</span><br> All Of The <b>${count}</b> Answer Were Correct`)
      : (theResult.innerHTML = `<span class="bad">You Are So Bad, Never Think Of Learning Programming.</span><br> You Have Answered <b>${rightAnswers}</b> From <b>${count}</b> Questions. <br> <a href="https://www.youtube.com/watch?v=_QkKOTsW8jk" class="trash" target="_blank">CLick Me!</a>`);
  } else if (objText === "Nader's") {
    rightAnswers > count / 2 && rightAnswers < count
      ? (theResult.innerHTML = `
      <span class="good">Not Bad, You Know A Little About Nader </span><br> You Have Answered <b>${rightAnswers}</b> From <b>${count}</b> Questions.
      `)
      : rightAnswers === parseInt(count)
      ? (theResult.innerHTML = `<span class="perfect">No Way You Got All The Questions About Nader Correctly, I am Sure You Cheated.</span><br> All Of The <b>${count}</b> Answer Were Correct`)
      : (theResult.innerHTML = `<span class="bad">Yeah It's Fine Nader Is Maestrias & An Interesting Person , Better Luck Next Time.</span><br> You Have Answered <b>${rightAnswers}</b> From <b>${count}</b> Questions. <br> <a href="https://www.youtube.com/watch?v=_QkKOTsW8jk" class="trash" target="_blank">CLick Me!</a>`);
  }
  resultsContainer.classList.add("result");
  resultsContainer.appendChild(theResult);
  resultsContainer.appendChild(restartBtn);
}
