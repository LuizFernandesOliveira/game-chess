class Pawn {
  position;
  players;
  possibleMoves = [];
  possibleAttacks = [];

  constructor(position, players) {
    this.position = position;
    this.players = players;
    this.possibleMoves = [];
    this.possibleAttacks = [];
    this.fillPossibleMoves();
  }

  fillPossibleMoves() {
    const [row, column] = this.position.split('-');
    const rowNumber = parseInt(row);

    const moveOneUp = `${rowNumber + 1}-${column}`;
    const moveTwoUp = `${rowNumber + 2}-${column}`;

    if (!containsPiecePosition(this, moveOneUp)) {
      this.possibleMoves.push(moveOneUp);

      if (rowNumber === 2 && !containsPiecePosition(this, moveTwoUp)) {
        this.possibleMoves.push(moveTwoUp);
      }
    }
  }

  getPossibleAttacks() {
    const possibleAttacks = [];
    const [row, column] = this._position.split('-');
    const rowNumber = parseInt(row);

    const opponentPiecesPositions = Object.values(this.players[1].pieces);

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
