
var qAs = [{question:"Commonly used data types do Not include:", a1:"strings", a2:"booleans", a3:"alerts", a4:"numbers", correct:"answer3"},
{question:"The condition in an if / else statement is enclosed with ____.", a1:"quotes", a2:"curly brackets", a3:"parentheses", a4:"square brackets", correct:"answer3"},
{question:"Arrays in Javascript can be used to store ____.", a1:"numbers and strings", a2:"other arrays", a3:"booleans", a4:"all of the above", correct:"answer4"},
{question:"String values must be enclosed within _____ when being assigned to variables.", a1:"commas", a2:"curly brackets", a3:"quotes", a4:"parentheses", correct:"answer3"},
{question:"A very useful tool used during development and debugging for printing content to the debugger is:", a1:"Javascript", a2:"terminal / bash", a3:"for loops", a4:"console.log", correct:"answer4"}];

var scores = [];
var timer = 75;
var scoreCounter;
var questionCounter = 0;

function getHighScores(){

    var scoresArray = JSON.parse(localStorage.getItem("highscores"));
    var table = document.getElementById("highs");
    table.innerHTML ="";
    if(scoresArray != null && scoresArray.length > 0){
        for(var item = 0; item < scoresArray.length; item++){
    
        
            var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = scoresArray[item].initials;
        cell2.innerHTML = scoresArray[item].highScore;
        };
    }

};

getHighScores();

document.getElementById("start").addEventListener("click", function() {
startQuiz();
});



function getQuestionAnswer (index){
    var para = document.createElement("h1");
    var t = document.createTextNode(qAs[index].question);
    para.appendChild(t);
    var div = document.createElement("div");
    var divQ1 = document.createElement("div");
    var answer1 = document.createElement("button");
    var answer1Text = document.createTextNode(qAs[index].a1);
    answer1.appendChild(answer1Text);
    answer1.id="answer1";
    answer1.className="button";
    divQ1.appendChild(answer1);
    var divQ2 = document.createElement("div");

    var answer2 = document.createElement("button");
    var answer2Text = document.createTextNode(qAs[index].a2);
    answer2.appendChild(answer2Text);
    answer2.id="answer2";
    answer2.className="button";
    divQ2.appendChild(answer2);
    var divQ3 = document.createElement("div");

    var answer3 = document.createElement("button");
    var answer3Text = document.createTextNode(qAs[index].a3);
    answer3.appendChild(answer3Text);
    answer3.id="answer3";
    answer3.className="button";
    divQ3.appendChild(answer3);
    var divQ4 = document.createElement("div");

    var answer4 = document.createElement("button");
    var answer4Text = document.createTextNode(qAs[index].a4);
    answer4.appendChild(answer4Text);
    answer4.id="answer4";
    answer4.className="button";
    divQ4.appendChild(answer4);
div.appendChild(divQ1);
div.appendChild(divQ2);
div.appendChild(divQ3);
div.appendChild(divQ4);
    var area = document.getElementById("quiz-area");
    area.innerHTML="";
    area.appendChild(para);
    area.appendChild(div);
};

function saveHighScores(){
            var initials =document.getElementById("initialsInput").value;
            var highScores = {
                initials: initials, highScore : timer
            }
            scores = JSON.parse(localStorage.getItem("highscores"));
            if (!scores){
                scores = [];
            }
            scores.push(highScores);
            
            localStorage.setItem("highscores", JSON.stringify(scores));
            getHighScores();
            document.getElementById("quiz-area").innerHTML ="";
            document.getElementById("score-area").innerHTML ="";
            var clearDiv = document.createElement("div");
            var clearButton = document.createElement("button");
            var clearText = document.createTextNode("Clear High Scores");
            clearButton.appendChild(clearText);
            clearButton.id = "clear";
            clearButton.className = "button";
            clearDiv.appendChild(clearButton);
            document.getElementById("confirm").appendChild(clearDiv);
            document.getElementById("table").style.display = "initial";
};

document.addEventListener('click',function(e){
     if(e.target.id === "save"){
        
saveHighScores();
    }
    if(e.target.id === "clear"){
        
      localStorage.clear();
      getHighScores();
            }
    if (e.target.id === "answer1" || e.target.id === "answer2" || e.target.id === "answer3" || e.target.id === "answer4"){
        if( e.target.id == qAs[questionCounter].correct){
            document.getElementById("confirm").innerHTML = "Correct!";
            setTimeout(function(){document.getElementById("confirm").innerHTML = ""; }, 500);
            
       } else {
        document.getElementById("confirm").innerHTML = "Incorrect";
        setTimeout(function(){document.getElementById("confirm").innerHTML = ""; }, 500);
           timer = timer - 15;
           if (timer <0){
               timer = 0;
           }
           document.getElementById("score-area").innerHTML = "Time: " + timer;
       }
       questionCounter++;
       if (questionCounter < qAs.length && timer > 0){
        getQuestionAnswer(questionCounter);
    } 
    else {
        document.getElementById("heading").innerHTML = "Quiz Complete";
        document.getElementById("confirm").innerHTML ="";

        clearInterval(scoreCounter);
        if (timer <0 ){
            timer = 0;
        }
        var score = document.createElement("h2");
        var scoreText = document.createTextNode("Your score is " + timer);
        score.appendChild(scoreText);
        var div = document.createElement("div");
        var input = document.createElement("input");
        var inputText = document.createTextNode("Please enter your initials");
        div.appendChild(inputText);
        input.id = "initialsInput";
        div.appendChild(input);
        score.appendChild(div);
        var scoreArea = document.getElementById("quiz-area");
        scoreArea.innerHTML = "";
        var divButton = document.createElement("div");

        var saveButton = document.createElement("button");
        var saveText = document.createTextNode("Save Score");
        saveButton.appendChild(saveText);
        saveButton.id="save";
        saveButton.className="button";
        divButton.appendChild(saveButton);
        score.appendChild(divButton);
        scoreArea.appendChild(score);


    }
    }

 });

 function startTimer (){
    scoreCounter = setInterval(function(){document.getElementById("score-area").innerHTML = "Time: " + timer; timer--; }, 1000);
    
 }
function startQuiz (){
    document.getElementById("heading").innerHTML = "";
    document.getElementById("table").style.display = "none";
    document.getElementById("highs").innerHTML = "";
    document.getElementById("score-area").innerHTML = "Time: " + timer;
    startTimer();
getQuestionAnswer(questionCounter);


};