var questions = [
    {question: "In what year was Philadelphia founded?",
    answers: ["1624", "1630", "1682", "1729"],
    correct: "1682"
    },{question: "What is the (approximate) population of Philadelphia?",
    answers: ["940,000", "1,120,000", "1,260,000", "1,580,000"],
    correct: "1,580,000"
    },{question: "True or False: West Philly is the Best Philly.",
    answers: ["True", "False"],
    correct: "True"
    }
];


var quizGame = {
    questions:questions,
    currentQ:0,
    timeLeft:30,
    correct:0,
    wrong:0,
    notAnswered:0,
    timer:0,
    time:0,
    // Clock function does not work unfortunately. I've tried to implement many different ways, the code below is only the latest iteration. I plan to do more work on learnig how to implement timers going forward.
    clock : function(){
        time = quizGame.timeLeft;
        time--;
        $("#clock").html("<h3>Time left:<br>" + time + "</h3>");
        if(time <= 0) {
            $("#main-message").html("<h2>Time's up!</h2>");
            quizGame.outOfTime();
        }
    },
    loadQ : function(){
        timer = setInterval(quizGame.clock(), 1000);
        $("#quiz-area").html("<h2>" + questions[quizGame.currentQ].question + "</h2>"); 
        $("#results").html("<h2>Here's how you're doing</h2><br><h3>Answered correctly: " + quizGame.correct + "</h3><br><h3>Answered incorrectly: " + quizGame.wrong + "</h3><br><h3>Not Answered: " + quizGame.notAnswered + "</h3><br>");
        for(i = 0; i < questions[quizGame.currentQ].answers.length; i++) {
            $("#quiz-area").append("<button class='ans-button' id='button-" + i + "' data-name='" + questions[quizGame.currentQ].answers[i] + "'>" + questions[quizGame.currentQ].answers[i] + "</button>");
        }
    },
    nextQ : function(){
        quizGame.currentQ++;
        quizGame.timeLeft = 30;
        $("#clock").html(quizGame.timeLeft);
        quizGame.loadQ();
    },
    outOfTime : function(){
        clearInterval(timer);
        $("#main-message").html("<h2>Time's up!</h2>");
        $("#subtext").html("<h3>The correct answer was: " + questions[quizGame.currentQ].correct + "</h3>");
        ++quizGame.notAnswered;
        if(quizGame.currentQ == questions.length - 1){
            setTimeout(quizGame.result(), 3000);
        } else {
            setTimeout(quizGame.nextQ(), 3000);
        } 
    },
    result : function(){
        clearInterval(timer);
        $("#results").html("")
        $("#quiz-area").html("<h2>Here's how you did</h2><br><h3>Answered correctly: " + quizGame.correct + "</h3><br><h3>Answered incorrectly: " + quizGame.wrong + "</h3><br><h3>Not Answered: " + quizGame.notAnswered + "</h3><br>");
        $("#quiz-area").append("<button id='restart'>Try again?</button>");
        $("#main-message").html("");
        $("#subtext").html("");
    },
    clicked : function(event){
        clearInterval(timer);
        console.log(quizGame.currentQ);
        if($(event.target).data("name") === questions[quizGame.currentQ].correct){
            quizGame.correctAnswer();
        } else {
            quizGame.wrongAnswer();
        }
    },
    correctAnswer : function(){
        
        $("#main-message").html("<h2>Correct!</h2>");
        $("#subtext").html("");
        clearInterval(timer);
        ++quizGame.correct;
        if(quizGame.currentQ == questions.length - 1){
            setTimeout(quizGame.result(), 2500);
        } else {
            setTimeout(quizGame.nextQ(), 2500);
        }
    },
    wrongAnswer : function(){
        $("#main-message").html("<h2>Better luck on the next one...</h2>");
        $("#subtext").html("<h3>The correct answer was: " + questions[quizGame.currentQ].correct + "</h3>");
        quizGame.wrong++;
        if(quizGame.currentQ == questions.length - 1){
            setTimeout(quizGame.result, 2500);
        } else {
            setTimeout(quizGame.nextQ(), 2500);
        }
    },
    initialize : function(){
        quizGame.currentQ = 0;
        quizGame.correct = 0;
        quizGame.wrong = 0;
        quizGame.loadQ();
        $("#main-message").html("");
        $("#subtext").html("");
    }
}

$(document.body).on("click", "#start", function() {
    $(this).remove();
    quizGame.loadQ();
});

$(document.body).on("click", ".ans-button", function(event) {
    quizGame.clicked(event);
})

$(document.body).on("click", "#restart", function() {
    quizGame.initialize();
}) 