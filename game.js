// The array of colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Init random color pattern array
var gamePattern = [];

// Init user chosen color pattern array
var userClickedPattern = [];

// Gameplay flow

var level = 0;
var gameStatus = false;

// Determine which button is clicked

$(document).keydown(function () {
  while (!gameStatus) {
    nextSequence();
    gameStatus = true;
  }
});


$(".btn").click(function (event) {
  var userChosenColor = event.target.id;

  // If do not want to use event and event.target, we can leave function empty and refer to it with =>  $(this).attr("id")

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer();
});

function nextSequence() {
  userClickedPattern = [];

  // Create a random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  // Assign the random color to a variable
  var randomChosenColor = buttonColors[randomNumber];

  // Adding random colors to array to memorize the all sequence
  gamePattern.push(randomChosenColor);

  // Flashing effect of the random color
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);

}

//  Defining and playing sound files in a functon
function playSound(name) {
  var myAudio = new Audio("sounds/" + name + ".mp3");
  myAudio.play();
}

// Button pressed animation
function animatePress(currentColor) {
  $("#" + currentColor)
    .addClass("pressed")
    .delay(100)
    .queue(function () {
      $(this).removeClass("pressed").dequeue();

      // One more way of adding a delay. Inside a function, we need to add next parameter. Without dequeue method, add next(); function to the last line.

      // Another way of adding a delay and removing class.
      //   setTimeout(function () {
      //     $("#" + currentColor).removeClass("pressed");
      //   }, 100);
    });
}

function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++)
    if (userClickedPattern[i] === gamePattern[i]) {
      if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
      }
    } else {
      playSound("wrong");
      $("body")
        .addClass("game-over")
        .delay(200)
        .queue(function () {
          $(this).removeClass("game-over").dequeue();
        });

      $("#level-title").text("Game Over, Press Any Key to Restart");
      restartGame();
    }
}

function restartGame() {
  level = 0;
  gamePattern = [];
  gameStatus = false;
}
