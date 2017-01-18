var currentTurn, totalTurns, gameOver, winCombos, allCells, message;

window.onload = startGame();

//initialize game
function startGame() {
      currentTurn = 'X';
      totalTurns = 0;
      gameOver = false;
      winCombos = [
        [1, 2, 3],[4, 5, 6],[7, 8, 9],[1, 5, 9],
        [3, 5, 7],[1, 4, 7],[2, 5, 8],[3, 6, 9],
      ];

      //attach an onclick event to each cell with setCell as event handler
      allCells = document.getElementsByTagName('td');
      for(var i=0; i<allCells.length; i++) {
        allCells[i].onclick = function() { setCell(this) }
        }

      message = document.getElementById('message');

      //set inital message
      setMessage(currentTurn + ' gets to start!');

    }

//display the status of the game
function setMessage(newMsg) {
  message.innerText = newMsg;
}

//onClick(cell) => place 'X' or 'O' on an available cell
function setCell(cell) {
  if(gameOver) {
    setMessage(currentTurn + ' already won!');
  } else if(cell.innerText == '') {
    cell.innerText = currentTurn;
    checkForWinner(currentTurn) ? setMessage(currentTurn + ' won!')
                                : toggleTurn();
  } else {
    setMessage('Occupied! Pick another cell.')
  }
}

//toggel turn between 'X' and 'O'
function toggleTurn() {
    currentTurn === 'X' ? currentTurn = 'O' : currentTurn = 'X';
    totalTurns++;
    totalTurns === 9  ? setMessage('It\'s a tie! Restart Game?')
                      : setMessage('It is now ' + currentTurn + '\'s turn!');
  }

//check for a winning combination of cells after every setCell call
function checkForWinner(currentTurn) {
  //map over each possible wining combination inside winCombos array
  winCombos.forEach(function(combo) {
     if (getCellValue(combo[0]) === currentTurn &&
         getCellValue(combo[1]) === currentTurn &&
         getCellValue(combo[2]) === currentTurn) {

         gameOver = true;
         hightlightWinningCells(combo);
     }
  });
  return gameOver;
}

//get individual cell value based on a given cellNumber => 'X' or 'O'
function getCellValue(cellNumber) {
  var cellId = 'c' + cellNumber;
  return document.getElementById(cellId).innerText;
}

//highlight the winning cells
function hightlightWinningCells(cellNumbers) {
  var cellIds = cellNumbers.map(function(num) {return 'c' + num;});
      cellIds.forEach(function(id) {
        document.getElementById('' + id).style.backgroundColor = 'aliceblue';
      })
}
