class Queen {
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
    const columnNumber = parseInt(getKeyByValue(LETTER_MAPPED, column));

    this.addUpMoves(rowNumber, column);
    this.addDownMoves(rowNumber, column);
    this.addLeftMoves(row, columnNumber);
    this.addRightMoves(row, columnNumber);
    this.addUpRightMoves(rowNumber, columnNumber);
    this.addUpLeftMoves(rowNumber, columnNumber);
    this.addDownRightMoves(rowNumber, columnNumber);
    this.addDownLeftMoves(rowNumber, columnNumber);
  }

  addUpMoves(rowNumber, column) {
    for (let i = rowNumber; i <= 8; i++) {
      if (i === rowNumber) {
        continue;
      }
      const position = `${i}-${column}`;
      if (containsPiecePosition(this, position)) {
        break;
      }
      this.possibleMoves.push(position);
    }
  }

  addDownMoves(rowNumber, column) {
    for (let i = rowNumber; i >= 1; i--) {
      if (i === rowNumber) {
        continue;
      }
      const position = `${i}-${column}`;
      if (containsPiecePosition(this, position)) {
        break;
      }
      this.possibleMoves.push(position);
    }
  }

  addLeftMoves(row, columnNumber) {
    for (let i = columnNumber; i >= 1; i--) {
      if (i === columnNumber) {
        continue;
      }
      const position = `${row}-${LETTER_MAPPED[i]}`;
      if (containsPiecePosition(this, position)) {
        break;
      }
      this.possibleMoves.push(position);
    }
  }

  addRightMoves(row, columnNumber) {
    for (let i = columnNumber; i <= 8; i++) {
      if (i === columnNumber) {
        continue;
      }
      const position = `${row}-${LETTER_MAPPED[i]}`;
      if (containsPiecePosition(this, position)) {
        break;
      }
      this.possibleMoves.push(position);
    }
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

  fillPossibleAttacks() {
    const [row, column] = this.position.split('-');
    const rowNumber = parseInt(row);
    const columnNumber = parseInt(getKeyByValue(LETTER_MAPPED, column));

    const opponentPiecesPositions = Object.values(this.players[1].pieces);

    this.addUpAttacks(rowNumber, column, opponentPiecesPositions);
    this.addDownAttacks(rowNumber, column, opponentPiecesPositions);
    this.addLeftAttacks(row, columnNumber, opponentPiecesPositions);
    this.addRightAttacks(row, columnNumber, opponentPiecesPositions);
    this.addUpRightAttacks(rowNumber, columnNumber, opponentPiecesPositions);
    this.addUpLeftAttacks(rowNumber, columnNumber, opponentPiecesPositions);
    this.addDownRightAttacks(rowNumber, columnNumber, opponentPiecesPositions);
    this.addDownLeftAttacks(rowNumber, columnNumber, opponentPiecesPositions);
  }

  addUpAttacks(rowNumber, column, opponentPiecesPositions) {
    for (let i = rowNumber + 1; i <= 8; i++) {
      const position = `${i}-${column}`;
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addDownAttacks(rowNumber, column, opponentPiecesPositions) {
    for (let i = rowNumber - 1; i >= 1; i--) {
      const position = `${i}-${column}`;
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addLeftAttacks(row, columnNumber, opponentPiecesPositions) {
    for (let i = columnNumber - 1; i >= 1; i--) {
      const position = `${row}-${LETTER_MAPPED[i]}`;
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addRightAttacks(row, columnNumber, opponentPiecesPositions) {
    for (let i = columnNumber + 1; i <= 8; i++) {
      const position = `${row}-${LETTER_MAPPED[i]}`;
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addUpRightAttacks(rowNumber, columnNumber, opponentPiecesPositions) {
    for (let i = rowNumber + 1, j = columnNumber + 1; i <= 8 && j <= 8; i++, j++) {
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addUpLeftAttacks(rowNumber, columnNumber, opponentPiecesPositions) {
    for (let i = rowNumber + 1, j = columnNumber - 1; i <= 8 && j >= 1; i++, j--) {
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addDownRightAttacks(rowNumber, columnNumber, opponentPiecesPositions) {
    for (let i = rowNumber - 1, j = columnNumber + 1; i >= 1 && j <= 8; i--, j++) {
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addDownLeftAttacks(rowNumber, columnNumber, opponentPiecesPositions) {
    for (let i = rowNumber - 1, j = columnNumber - 1; i >= 1 && j >= 1; i--, j--) {
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }
}