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
    this.fillPossibleAttacks();
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

  fillPossibleAttacks() {
    const [row, column] = this.position.split('-');
    const rowNumber = parseInt(row);
    const keyLetter = parseInt(getKeyByValue(LETTER_MAPPED, column));

    const moveRightUp = `${rowNumber + 1}-${LETTER_MAPPED[keyLetter + 1]}`;
    const moveLeftUp = `${rowNumber + 1}-${LETTER_MAPPED[keyLetter - 1]}`;

    if (POSSIBLE_POSITIONS.includes(moveRightUp)) {
      this.possibleAttacks.push(moveRightUp);
    }
    if (POSSIBLE_POSITIONS.includes(moveLeftUp)) {
      this.possibleAttacks.push(moveLeftUp);
    }
  }
}
