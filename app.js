'use strict';

let questionNumber=0;
let score=0;

const STORE = [
    {
        question:"The Operating System is a",
        choices:["System Software","Application Software","Utility Software","Malware"],
        answer:"System Software"
    },
    {
        question:"Eight Bits make up a",
        choices:["byte","megabyte","kilobyte","none"],
        answer:"byte"
    },
    {
        question:"Who was the father of computer",
        choices:["Charlie Bagage","Dennis Ritchie","Charles Babbage","Ken Thompson"],
        answer:"Charles Babbage"
    },
    {
        question:"What does CPU stand for ?",
        choices:["Central Process Unit","Central Processing Unit","Central Programming Unit","Central Progressive Unit"],
        answer:"Central Processing Unit"
    },
    {
        question:"Who founded Apple Computer?",
        choices:["Steve Jobs","Bill Gates","Stephen Hawking","Stephen Fry"],
        answer:"Steve Jobs"
    },
    {
        question:"What does the Internet prefix WWW stand for?",
        choices:["World Wide Web","Western Washington World","Worldwide Weather","Wide Width Wickets"],
        answer:"World Wide Web"
    },
    {
        question:"Which of these is not a computer brand?",
        choices:["Lenovo","Lada","Toshiba","Apple"],
        answer:"Lada"
    },
    {
        question:"Which of these products is not made by the Apple Corporation?",
        choices:["IMAX","iMac","iPod","iPhone"],
        answer:"IMAX"
    },
    {
        question:"Along with whom did Bill Gates found Microsoft?",
        choices:["Steve Jobs","Elon Musk","Paul Allen","Larry Page"],
        answer:"Paul Allen"
    },
    {
        question:"Which one of these applications is not a browser?",
        choices:["Firefox","Web Explorer","Chrome","Safari"],
        answer:"Web Explorer"
    }
];

function handleScoreUpdate(){
    if(questionNumber+1 < STORE.length){
        questionNumber++;
    }
}
// this shows the answer for the question
//depending if the user got it right or wrong
//and display appropriate feedback by making the correct answers background 
//green and the wrong one red
function showAnswer(){
    $("#js-score").text("Correct " + score);
    if(checkChoice()){
        $("input[name='answer']:checked").parent().addClass('correct');
    }else{
        $("input[name='answer']:checked").parent().addClass('wrong');
        $("input[value='"+STORE[questionNumber].answer+"']").parent().addClass('correct');
    }
    if(questionNumber+1<STORE.length){
        $("#submitButton").text("Next Question");
        handleScoreUpdate();
    }else{
        $("#submitButton").text("View Answers");
    }
}
function checkChoice(){
   return $("input[name='answer']:checked").val()===STORE[questionNumber].answer;
}
//check the choice and provide appropiate feedback to the user on the screen
function handleChoice(){
    let resultFeedback= $("#js-resultFeedback");
    if(checkChoice()){
        resultFeedback.text("Yay");
        resultFeedback.addClass("correct");
        score++;
    }else{
        $("#js-resultFeedback").text("Ops");
        $("#js-resultFeedback").addClass("wrong");
    }
    resultFeedback.show();
    showAnswer();
}
//this handles the next question submit and the last question submit
function handleSubmit(event){
    event.preventDefault();
    if($("#submitButton").text()==="Next Question"){
        $("#js-resultFeedback").hide();
        renderQuestions();
    }else if($("#submitButton").text()==="View Answers"){
        $("#resultFeedback").text("Game Over");
        $("#question").html("<p>Correct - "+ score +" out of "+STORE.length+"<p>Want to play Again ? Click on the restart button</p>");
        $("#questionsForm").html('<button id="restartButton" type="button" autofocus>Restart</button>');
    }
    else{
        handleChoice();
    }
}

function updateScore(){
    $("#current-question").text(questionNumber+1+" out of "+ STORE.length);
    $("#question").text(STORE[questionNumber].question);
    $("#questionsForm").text("");
} 

function renderQuestions(){
    updateScore();
    let choices = STORE[questionNumber].choices;
    //for each aviable choice create a new element and append it to the submit form
    choices.forEach((question,index)=>{
        let item=`<label class="answerLabel"><input type="radio" value="${question}" name="answer" required>${question}</label>`;
        $("#questionsForm").append(item);
    });

    $("#questionsForm").append('<button id="submitButton" type="submit">Submit</button>');
}

function handleGameRestartButton(){
    $("#questionsForm").on('click',"#restartButton",function(event){
        handleGameStart();
        this.remove();
        renderQuestions();
    });
}
function handleFormSubmitButton(){
    $("#questionsForm").on('submit',handleSubmit);
}
function handleStartButton(){
    $("#startButton").on('click',function(event){
        this.remove();
        renderQuestions();
    });
}

//reset the question and score to the initial values
function handleGameStart(){
    questionNumber=0;
    score=0;
    $("#current-question").text(questionNumber +" out of "+ STORE.length);
    $("#js-score").text("Correct " + score);
}
function mainApp(){
    handleGameStart();
    handleStartButton();
    handleFormSubmitButton();
    handleGameRestartButton();
}
$(mainApp);