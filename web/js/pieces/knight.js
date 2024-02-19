class Knight {
  _position;
  _players;

  constructor(position, players) {
    this._position = position;
    this._players = players;
  }

  getPossibleMoves() {
    const possibleMoves = [];
    const [row, column] = this._position.split('-');
    const rowNumber = parseInt(row);
    const keyLetter = parseInt(getKeyByValue(LETTER_MAPPED, column));

    const moveNumberRightLeft = `${rowNumber + 2}-${LETTER_MAPPED[keyLetter + 1]}`;
    const moveNumberLeftRight = `${rowNumber + 2}-${LETTER_MAPPED[keyLetter - 1]}`;
    const moveNumberLeftDown = `${rowNumber - 2}-${LETTER_MAPPED[keyLetter - 1]}`;
    const moveNumberRightDown = `${rowNumber - 2}-${LETTER_MAPPED[keyLetter + 1]}`;

    const moveLetterRightLeft = `${rowNumber + 1}-${LETTER_MAPPED[keyLetter + 2]}`;
    const moveLetterLeftRight = `${rowNumber - 1}-${LETTER_MAPPED[keyLetter + 2]}`;
    const moveLetterLeftDown = `${rowNumber - 1}-${LETTER_MAPPED[keyLetter - 2]}`;
    const moveLetterRightDown = `${rowNumber + 1}-${LETTER_MAPPED[keyLetter - 2]}`;

    const moves = [];

    if (POSSIBLE_POSITIONS.includes(moveNumberRightLeft)) {
      moves.push(moveNumberRightLeft);
    }
    if (POSSIBLE_POSITIONS.includes(moveNumberLeftRight)) {
      moves.push(moveNumberLeftRight);
    }
    if (POSSIBLE_POSITIONS.includes(moveNumberLeftDown)) {
      moves.push(moveNumberLeftDown);
    }
    if (POSSIBLE_POSITIONS.includes(moveNumberRightDown)) {
      moves.push(moveNumberRightDown);
    }
    if (POSSIBLE_POSITIONS.includes(moveLetterRightLeft)) {
      moves.push(moveLetterRightLeft);
    }
    if (POSSIBLE_POSITIONS.includes(moveLetterLeftRight)) {
      moves.push(moveLetterLeftRight);
    }
    if (POSSIBLE_POSITIONS.includes(moveLetterLeftDown)) {
      moves.push(moveLetterLeftDown);
    }
    if (POSSIBLE_POSITIONS.includes(moveLetterRightDown)) {
      moves.push(moveLetterRightDown);
    }

    const piecesPositions = [...Object.values(this._players[0].pieces), ...Object.values(this._players[1].pieces)];
    moves.forEach((move) => {
      if (!piecesPositions.includes(move)) {
        possibleMoves.push(move);
      }
    });

    return possibleMoves;
  }
}