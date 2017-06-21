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
function drawBackground() {
    var tileContainer = document.getElementById('tile-container');
    tileContainer.innerHTML = '';
    for (var i = 0; i < size * size; i++) {
        var tileDiv = document.createElement('div');
        var x = i % size;
        var y = Math.floor(i / size);
        tileDiv.style.top = y * 100 + 'px';
        tileDiv.style.left = x * 100 + 'px';
        tileDiv.classList.add("background");
        tileContainer.appendChild(tileDiv);
    }
}
function canGenerate(i, j) {
    if (game[i][j] != 0) {
        return false;
    }
    return true;
}
function createRandomTile() {
    var tileContainer = document.getElementById('tile-container');
    var randomX = Math.random() * 5;
    randomX = parseInt(randomX, 10);
    var randomY = Math.random() * 5;
    randomY = parseInt(randomY, 10);
    while(!canGenerate(randomY,randomX)) {
        randomX = Math.random() * 5;
        randomX = parseInt(randomX, 10);
        randomY = Math.random() * 5;
        randomY = parseInt(randomY, 10);
    }
    var value = generateRandom();
    var tileDiv = document.createElement('div');
    tileDiv.classList.add('tile','tile--' + value);
    setTimeout(function () {
        tileDiv.classList.add("tile--pop");
    }, 100);
    tileDiv.innerHTML = '<p>' + value + '</p>';
    tileDiv.style.left = randomX * 100 + 'px';
    tileDiv.style.top = randomY * 100 + 'px';
    tileDiv.id = (randomY) + "" + (randomX);
    tileContainer.appendChild(tileDiv);
    game[randomY][randomX] = value;
}
function generateRandom() {
    return Math.random() > 0.5 ? 2 : 4;
}
function newGameStart() {
    document.getElementById('tile-container').innerHTML = '';
    initGame();
    drawBackground();
    createRandomTile();
    createRandomTile();
}
function no_block_horizontal(i, k, j) {
    k++;
    for (; k < j; k++) {
        if (game[i][k] !== 0)
            return false;
    };
    return true;
}
function no_block_vertical(i, k, j) {
    k++;
    for (; k < j; k++) {
        if (game[k][i] !== 0) {
            return false;
        };
    };
    return true;
}
function shiftRight() {
    var result = [];
    for (var i = 0; i < game.length; i++) {
        for (var j = game[i].length - 2; j >= 0; j--) {
            if (game[i][j] != 0) {
                for (var k = game[i].length - 1; k > j; k--) {
                    //褰撳墠鐨勬槸data[i][j], 濡傛灉鏈€宸﹁竟鐨勬槸0锛?鑰屼笖涔嬮棿鐨勫叏閮ㄦ槸0
                    if (game[i][k] === 0 && this.no_block_horizontal(i, k, j)) {
                        result.push({ form: { y: i, x: j }, to: { y: i, x: k } });
                        game[i][k] = game[i][j];
                        game[i][j] = 0;
                        break;
                    } else if (game[i][k] !== 0 && game[i][j] === game[i][k] && this.no_block_horizontal(i, j, k)) {
                        result.push({ form: { y: i, x: j }, to: { y: i, x: k } });
                        game[i][k] += game[i][j];
                        score += game[i][k];
                        game[i][j] = 0;
                        break;
                    };
                };
            };
        };
    };
    return result;
}
function shiftLeft() {
    var result = [];
    for (var i = 0; i < game.length; i++) {
        for (var j = 1; j < game[i].length; j++) {
            if (game[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (game[i][k] == 0 && no_block_horizontal(i, k, j)) {
                        result.push({ form: { y: i, x: j }, to: { y: i, x: k } });
                        game[i][k] = game[i][j];
                        game[i][j] = 0;
                        break;
                    }
                    else if (game[i][j] !== 0 && game[i][j] === game[i][k] && no_block_horizontal(i, k, j)) {
                        result.push({ form: { y: i, x: j }, to: { y: i, x: k } });
                        game[i][k] += game[i][j];
                        score += game[i][k];
                        game[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    return result;
}
function shiftUp() {
    var result = [];
    // 寰幆瑕佹娴嬬殑闀垮害
    for (var i = 0; i < game[0].length; i++) {
        // 寰幆瑕佹娴嬬殑楂樺害
        for (var j = 1; j < game.length; j++) {
            if (game[j][i] != 0) {
                //x鏄‘瀹氱殑, 寰幆y鏂瑰悜;
                for (var k = 0; k < j ; k++) {
                    //褰撳墠鐨勬槸data[j][i], 濡傛灉鏈€涓婇潰鐨勬槸0锛?鑰屼笖涔嬮棿鐨勫叏閮ㄦ槸0
                    if (game[k][i] === 0 && this.no_block_vertical(i, k, j)) {
                        result.push({ form: { y: j, x: i }, to: { y: k, x: i } });
                        game[k][i] = game[j][i];
                        game[j][i] = 0;
                        break;
                    } else if (game[j][i] !== 0 && game[k][i] === game[j][i] && this.no_block_vertical(i, k, j)) {
                        result.push({ form: { y: j, x: i }, to: { y: k, x: i } });
                        game[k][i] += game[j][i];
                        score += game[k][i];
                        game[j][i] = 0;
                        break;
                    };
                };
            };
        };
    };
    return result;
}
