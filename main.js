// Get The Selectors
const quizForm = document.querySelector("form");
const categoryBox = document.getElementById("categories");
const qCountBox = document.getElementById("ques-count");
const diffcultyBox = document.getElementById("diffculty");
let categoryObj, categoryText, categoryCount, categoryDiffculty;

// When Submitting The Form
quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get The Data From The From
  categoryObj = categoryBox.value;
  categoryText = categoryBox.options[categoryBox.selectedIndex].text;

  categoryCount = qCountBox.value;
  categoryDiffculty = diffcultyBox.value;
  // Passing The Choosen Data By This Object
  const data = {
    choosenObj: categoryObj,
    choosenText: categoryText,
    choosenCount: categoryCount,
    choosenDiff: categoryDiffculty,
  };
  //Set The Data In THe Local Storage To Use It In The Quiz Page
  window.localStorage.setItem("data", JSON.stringify(data));
  // Redierect The Page
  window.location.href = "./quiz.html";
});
