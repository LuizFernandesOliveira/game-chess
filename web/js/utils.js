function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function removeClass(clazz) {
  const possibleMoves = document.getElementsByClassName(clazz);
  for (let i = possibleMoves.length - 1; i >= 0; i--) {
    possibleMoves[i].className = possibleMoves[i].className.replace(clazz, '');
  }
}

function appendClass(element, clazz) {
  element.className = `${element.className} ${clazz}`;
}

function containsPiecePosition(piece, position) {
  const piecesPositions = [...Object.values(piece.players[0].pieces), ...Object.values(piece.players[1].pieces)];
  return piecesPositions.includes(position);
}