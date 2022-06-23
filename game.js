var buttonColours = ["mauve", "magenta", "rose", "purple"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var started = false;


$(document).on("keydown", function(){
  if (!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  // variable to store THIS button object's "id" attribute
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern.length);

  playSound(userChosenColour);
  animatePress(userChosenColour)

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);


}

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    console.log("success");

    if (gamePattern.length === userClickedPattern.length){
      setTimeout(nextSequence, 1000);
    }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


function playSound(name){
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}


function animatePress(currentColour){

  var keySelected = $("#" + currentColour);

  keySelected.addClass("pressed");

  setTimeout(function(){
    keySelected.removeClass("pressed");
  }, 100);
}
