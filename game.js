var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var gameRunning = false;
var level = 0;

$(document).on("keydown touchstart",function(event){
  event.preventDefault();

if(!gameRunning)
{

  $("#level-title").text("Level " + level);
    nextSequence();
    gameRunning = true;

}

});


$(".btn").on("click touchstart",function(event) {
  event.preventDefault();

    var userChosenColour = $(this).attr("id");
  
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    playAnimation(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  
  });



  function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
      if(userClickedPattern.length==gamePattern.length)
      {
        setTimeout(function(){
          nextSequence();
        },1000)
      }
    }
  
  
    else
    {
      gameOver();
    }
  
  }
  

function nextSequence(){
    level++;
    $("#level-title").text("level : " + level);
    userClickedPattern=[];
  

  var  randomNumber = Math.floor( Math.random()*4 );
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  for (var i = 0; i < gamePattern.length; i++) {
    (function(index) {
        setTimeout(function() {
            $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[index]);
        }, (i + 1) * 300); // Note the change in the delay calculation
    })(i);
}




}


function gameOver(){
  userClickedPattern=[];
  gamePattern=[];
  level=0;
  gameRunning=false;
  $("#level-title").text("Game Over! Press Any Key to Start");
  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();

$("body").addClass("game-over");

  setTimeout(function(){
  $("body").removeClass("game-over");
  },400);

}




function playAnimation(currentColor){
  
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
  $("#" + currentColor).removeClass("pressed");
  },100);

}


function playSound(name){


  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}




