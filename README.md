# quizAppWebiste

![image](https://user-images.githubusercontent.com/92198960/214292187-1cee02f8-e562-42e8-8096-37f7d635cdab.png)

![image](https://user-images.githubusercontent.com/92198960/214292277-f12f9cf7-f91f-4f11-988c-4df808a1954d.png)

![image](https://user-images.githubusercontent.com/92198960/214292614-52a663e3-7681-4924-b667-8f142d4633d0.png)

## Technology : 

1. HTML
2. CSS
3. Tailwind Css
4. JavaScript
5. DOM
6. BOM
7. JSON
8. Fetch Api

### Challenges: 

#### This Quiz app consists of three pages which are:

1. Home Page : 
  - Getting Information from the user, information consists of :
    1. The main category that the user wants to take the quizz with.
    2. Number of questions.
    3. The diffculty of the quizz.
  - Saving the choosen information to the local storage to pass it for the next page.

2. Quiz App Page :
  - After receiving the choosen information from the user, it would be assinged to the page dynamically:
    1. The name of the choosen category.
    2. The number of questions.
  - Bullets would be created upon the number of questions number.
  - Count down timer will start and the time applied is taking from the user's choosen diffculty.
   1. If the time ended before finishing the questions, the user will be redirected to the results page.
  - Questions will apper in the page from the choosen catergory
  - When submitting the answer: 
    1. The user moves to the next question.
    2. The use moves to the next bullet and the background color of the bullet will change to let the user know in which question he is.
    3. The next question will be insertied in the page randomlly.
 
3. Result Page :
  - After submitting the final question, the user will be directed to the result page.
  - Result consists of 3 different messages:
    1. If all answer were correct then the message would be -> Perfect 
    2. If the user answered more than the half of the question and less than the total number then the message would be -> Good.
    3. If the user answered less than the half of the question then the message would be -> Bad.
  - A special meesage would apper to the user depends on the choosen category.
  - The user can retake the quiz when clicking on the (Retake quiz) button.

