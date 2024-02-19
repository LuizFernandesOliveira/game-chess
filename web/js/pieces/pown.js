class Pawn {
  _position;
  _players;
  _moves;

  constructor(position, players) {
    this._position = position;
    this._players = players;
  }

  mountMoves() {
    const [row, column] = this._position.split('-');
    const rowNumber = parseInt(row);

    const moveOneUp = `${rowNumber + 1}-${column}`;
    const moveTwoUp = `${rowNumber + 2}-${column}`;

    this._moves = [
      moveOneUp,
      moveTwoUp,
    ];
  }

  getPossibleMoves() {
    const possibleMoves = [];
    const [row, column] = this._position.split('-');
    const rowNumber = parseInt(row);

    const moveOneUp = `${rowNumber + 1}-${column}`;
    const moveTwoUp = `${rowNumber + 2}-${column}`;

    const piecesPositions = [...Object.values(this._players[0].pieces), ...Object.values(this._players[1].pieces)];

    if (piecesPositions.includes(moveOneUp)) {
      return possibleMoves;
    }
    possibleMoves.push(moveOneUp);

    if (rowNumber === 2 && !piecesPositions.includes(moveTwoUp)) {
      possibleMoves.push(moveTwoUp);
    }

    return possibleMoves;
  }

  getPossibleAttacks() {
    const possibleAttacks = [];
    const [row, column] = this._position.split('-');
    const rowNumber = parseInt(row);

    const opponentPiecesPositions = Object.values(this._players[1].pieces);

    const keyLetter = parseInt(getKeyByValue(LETTER_MAPPED, column));
    const attacks = [
      `${rowNumber + 1}-${LETTER_MAPPED[keyLetter - 1]}`,
      `${rowNumber + 1}-${LETTER_MAPPED[keyLetter + 1]}`,
    ];

    attacks.forEach((attack) => {
      if (opponentPiecesPositions.includes(attack)) {
        possibleAttacks.push(attack);
      }
    });
    return possibleAttacks;
  }
}
