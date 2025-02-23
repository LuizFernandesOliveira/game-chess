class Knight {
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
    const keyLetter = parseInt(getKeyByValue(LETTER_MAPPED, column));

    const moveNumberRightLeft = `${rowNumber + 2}-${LETTER_MAPPED[keyLetter + 1]}`;
    const moveNumberLeftRight = `${rowNumber + 2}-${LETTER_MAPPED[keyLetter - 1]}`;
    const moveNumberLeftDown = `${rowNumber - 2}-${LETTER_MAPPED[keyLetter - 1]}`;
    const moveNumberRightDown = `${rowNumber - 2}-${LETTER_MAPPED[keyLetter + 1]}`;

    const moveLetterRightLeft = `${rowNumber + 1}-${LETTER_MAPPED[keyLetter + 2]}`;
    const moveLetterLeftRight = `${rowNumber - 1}-${LETTER_MAPPED[keyLetter + 2]}`;
    const moveLetterLeftDown = `${rowNumber - 1}-${LETTER_MAPPED[keyLetter - 2]}`;
    const moveLetterRightDown = `${rowNumber + 1}-${LETTER_MAPPED[keyLetter - 2]}`;

    const positions = [];

    if (POSSIBLE_POSITIONS.includes(moveNumberRightLeft)) {
      positions.push(moveNumberRightLeft);
    }
    if (POSSIBLE_POSITIONS.includes(moveNumberLeftRight)) {
      positions.push(moveNumberLeftRight);
    }
    if (POSSIBLE_POSITIONS.includes(moveNumberLeftDown)) {
      positions.push(moveNumberLeftDown);
    }
    if (POSSIBLE_POSITIONS.includes(moveNumberRightDown)) {
      positions.push(moveNumberRightDown);
    }
    if (POSSIBLE_POSITIONS.includes(moveLetterRightLeft)) {
      positions.push(moveLetterRightLeft);
    }
    if (POSSIBLE_POSITIONS.includes(moveLetterLeftRight)) {
      positions.push(moveLetterLeftRight);
    }
    if (POSSIBLE_POSITIONS.includes(moveLetterLeftDown)) {
      positions.push(moveLetterLeftDown);
    }
    if (POSSIBLE_POSITIONS.includes(moveLetterRightDown)) {
      positions.push(moveLetterRightDown);
    }

    positions.forEach((position) => {
      if (containsPiecePosition(this, position)) {
        this.possibleMoves.push(position);
      }
    });
  }

  getPossibleAttacks() {
    const possibleAttacks = [];
    return possibleAttacks;
  }
}