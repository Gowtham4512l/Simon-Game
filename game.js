var original = [];
var k = 0;
var gameStarted = false;

function animate(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 200);
}

function sound(color) {
    var audioElement;
    switch (color) {
        case "green":
            audioElement = document.getElementById("greenSound");
            break;
        case "red":
            audioElement = document.getElementById("redSound");
            break;
        case "yellow":
            audioElement = document.getElementById("yellowSound");
            break;
        case "blue":
            audioElement = document.getElementById("blueSound");
            break;
    }

    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.play();
    }
}

function nextSequence() {
    var rand = Math.floor(Math.random() * 4) + 1;
    var color;
    switch (rand) {
        case 1:
            color = "green";
            break;
        case 2:
            color = "red";
            break;
        case 3:
            color = "yellow";
            break;
        case 4:
            color = "blue";
            break;
        default:
            break;
    }
    original.push(color);
    animate(color);
    sound(color);
}

function gameOver() {
    var audioElement = document.getElementById("gameOver");
    audioElement.play();
    original = [];
    gameStarted = false;
    $("h1").text("Game Over, Press A Key to Start");
    k = 0;

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function initializeGame() {
    $(document).on('keydown', function () {
        if (gameStarted === false) {
            $("h1").text("Level-" + k);
            gameStarted = true;
            original = [];
            k = 0;
            nextSequence();
        }
    });

    $(".btn").click(function () {
        if (gameStarted == false) {
            return;
        };

        if (k >= original.length) {
            gameOver();
            return;
        }

        var color = $(this).attr("id");
        if (original[k] === color) {
            animate(color);
            sound(color);
            k++;
            if (k === original.length) {
                setTimeout(function () {
                    $("h1").text("Level-" + k);
                    nextSequence();
                    k = 0;
                }, 500);
            }
        } else {
            gameOver();
        }
    });
}

initializeGame();