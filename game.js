var game = null;
var size = 5;
var score = 0;
function initGame() {
    game = [];
    for (var i = 0; i < size; i++) {
        game[i] = [];
        for (var j = 0; j < size; j++) {
            game[i][j] = 0;
        }
    }

}
