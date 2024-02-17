function setProperties() {
  applySizeScreen();
}

function applySizeScreen() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (height > width) {
    const board = document.getElementById('board');
    board.style.width = '88dvw';
    board.style.height = '88dvw';

    const squares = document.getElementsByClassName('square');
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.minWidth = '11dvw';
      squares[i].style.minHeight = '11dvw';
    }
  }
}