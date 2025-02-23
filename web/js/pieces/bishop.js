class Bishop {
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
    const columnNumber = parseInt(getKeyByValue(LETTER_MAPPED, column));

    this.addUpRightMoves(rowNumber, columnNumber);
    this.addUpLeftMoves(rowNumber, columnNumber);
    this.addDownRightMoves(rowNumber, columnNumber);
    this.addDownLeftMoves(rowNumber, columnNumber);
  }
  
  addUpRightMoves(rowNumber, columnNumber) {
    for (let i = rowNumber, j = columnNumber; i <= 8 && j <= 8; i++, j++) {
      if (i === rowNumber && j === columnNumber) {
        continue;
      }
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (containsPiecePosition(this, position)) {
        break;
      }
      this.possibleMoves.push(position);
    }
  }

  addUpLeftMoves(rowNumber, columnNumber) {
    for (let i = rowNumber, j = columnNumber; i <= 8 && j >= 1; i++, j--) {
      if (i === rowNumber && j === columnNumber) {
        continue;
      }
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (containsPiecePosition(this, position)) {
        break;
      }
      this.possibleMoves.push(position);
    }
  }

  addDownRightMoves(rowNumber, columnNumber) {
    for (let i = rowNumber, j = columnNumber; i >= 1 && j <= 8; i--, j++) {
      if (i === rowNumber && j === columnNumber) {
        continue;
      }
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (containsPiecePosition(this, position)) {
        break;
      }
      this.possibleMoves.push(position);
    }
  }

  addDownLeftMoves(rowNumber, columnNumber) {
    for (let i = rowNumber, j = columnNumber; i >= 1 && j >= 1; i--, j--) {
      if (i === rowNumber && j === columnNumber) {
        continue;
      }
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (containsPiecePosition(this, position)) {
        break;
      }
      this.possibleMoves.push(position);
    }
  }

  getPossibleAttacks() {
    const possibleAttacks = [];
    return possibleAttacks;
  }
}