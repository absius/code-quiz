
var qAs = [{question:"Q1", a1:"500", a2:"white", a3:"test3", a4:"test4", correct:"answer4"},
{question:"Q2", a1:"500", a2:"white", a3:"test3", a4:"test4", correct:"answer2"},
{question:"Q3", a1:"500", a2:"white", a3:"test3", a4:"test4", correct:"answer1"},
{question:"Q4", a1:"500", a2:"white", a3:"test3", a4:"test4", correct:"answer3"},
{question:"Q5", a1:"500", a2:"white", a3:"test3", a4:"test4", correct:"answer4"}];

var scores = [];
var timer = 30;
var scoreCounter;
var questionCounter = 0;

function getHighScores(){

    var scoresArray = JSON.parse(localStorage.getItem("highscores"));
    var table = document.getElementById("highs");
    table.innerHTML ="";
    for(var item = 0; item < scoresArray.length; item++){
    
        
        var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = scoresArray[item].initials;
    cell2.innerHTML = scoresArray[item].highScore;
    };
};

getHighScores();

document.getElementById("start").addEventListener("click", function() {
startQuiz();
});



function getQuestionAnswer (index){
    var para = document.createElement("P");
    var t = document.createTextNode(qAs[index].question);
    para.appendChild(t);
    var div = document.createElement("div");
    var answer1 = document.createElement("button");
    var answer1Text = document.createTextNode(qAs[index].a1);
    answer1.appendChild(answer1Text);
    answer1.id="answer1";
    div.appendChild(answer1);
    var answer2 = document.createElement("button");
    var answer2Text = document.createTextNode(qAs[index].a2);
    answer2.appendChild(answer2Text);
    answer2.id="answer2";
    div.appendChild(answer2);
    var answer3 = document.createElement("button");
    var answer3Text = document.createTextNode(qAs[index].a3);
    answer3.appendChild(answer3Text);
    answer3.id="answer3";
    div.appendChild(answer3);
    var answer4 = document.createElement("button");
    var answer4Text = document.createTextNode(qAs[index].a4);
    answer4.appendChild(answer4Text);
    answer4.id="answer4";
    div.appendChild(answer4);

    var area = document.getElementById("quiz-area");
    area.innerHTML="";
    area.appendChild(para);
    area.appendChild(div);
};

document.addEventListener('click',function(e){
    if (e.target.id === "answer1" || e.target.id === "answer2" || e.target.id === "answer3" || e.target.id === "answer4"){
        if( e.target.id == qAs[questionCounter].correct){
            document.getElementById("confirm").innerHTML = "Correct!";
            
       } else {
        document.getElementById("confirm").innerHTML = "Incorrect";
           timer = timer - 15;
           if (timer <0){
               timer = 0;
           }
           document.getElementById("score-area").innerHTML = timer;
       }
       questionCounter++;
       if (questionCounter < qAs.length && timer > 0){
        getQuestionAnswer(questionCounter);
    } else {
        document.getElementById("heading").innerHTML = "Quiz Complete";
        document.getElementById("confirm").innerHTML ="";
        clearInterval(scoreCounter);
        if (timer <0 ){
            timer = 0;
        }
        var score = document.createElement("p");
        var scoreText = document.createTextNode("Your score is " + timer);
        score.appendChild(scoreText);
        var scoreArea = document.getElementById("quiz-area");
        scoreArea.innerHTML = "";
        scoreArea.appendChild(score);
        var initials = prompt("Please enter initials");
        var highScores = {
            initials: initials, highScore : timer
        }
        scores = JSON.parse(localStorage.getItem("highscores"));
        scores.push(highScores);
        
        localStorage.setItem("highscores", JSON.stringify(scores));
        getHighScores();
    }
    }

 });

 function startTimer (){
    scoreCounter = setInterval(function(){ timer--; document.getElementById("score-area").innerHTML = timer;}, 1000);
    
 }
function startQuiz (){
    document.getElementById("heading").innerHTML = "Quiz in Progress";
    document.getElementById("highs").innerHTML = "";
getQuestionAnswer(questionCounter);
startTimer();

};