$(document).ready(function () {

    var colorsArr = ["red", "green", "blue", "yellow"];
    var gamePattern = [];
    var userPattern = [];
    var level = 0;
    var gameStarted = false;

    $(document).keydown(function () {
        if (gameStarted === false) {
            gameStarted = true;
            nextSequence();
        }
    });

    function animateAndPlay(color) {
        $("." + color).addClass("pressed");

        setTimeout(function () {
            $("." + color).removeClass("pressed");
        }, 100);

        var audio = new Audio("./sounds/" + color + ".mp3");
        audio.play();
    }

    function nextSequence() {
        level++;
        $("h1").text("Level " + level);

        var randomNumber = Math.floor(Math.random() * 4);
        var randomColor = colorsArr[randomNumber];
        gamePattern.push(randomColor);

        animateAndPlay(randomColor);
    }

    function checkUserInput() {
        for (var i = 0; i < userPattern.length; i++) {
            if (userPattern[i] !== gamePattern[i]) {
                gameOver();
                return;
            }
        }

        if (userPattern.length === gamePattern.length) {
            setTimeout(function () {
                userPattern = [];
                nextSequence();
            }, 500);
        }
    }

    $(".btn").click(function () {
        var userChosenColor = $(this).attr("id");
        userPattern.push(userChosenColor);

        animateAndPlay(userChosenColor);
        checkUserInput();
    });

    function gameOver() {
        $("h1").text("Game Over! Press any key to restart.");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        level = 0;
        gamePattern = [];
        userPattern = [];
        gameStarted = false;
    }
});
