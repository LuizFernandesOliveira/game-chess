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
    this.fillPossibleAttacks();
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

  fillPossibleAttacks() {
    const [row, column] = this.position.split('-');
    const rowNumber = parseInt(row);
    const columnNumber = parseInt(getKeyByValue(LETTER_MAPPED, column));

    const opponentPiecesPositions = Object.values(this.players[1].pieces);
    const playerPiecesPositions = Object.values(this.players[0].pieces);

    this.addUpRightAttacks(rowNumber, columnNumber, opponentPiecesPositions, playerPiecesPositions);
    this.addUpLeftAttacks(rowNumber, columnNumber, opponentPiecesPositions, playerPiecesPositions);
    this.addDownRightAttacks(rowNumber, columnNumber, opponentPiecesPositions, playerPiecesPositions);
    this.addDownLeftAttacks(rowNumber, columnNumber, opponentPiecesPositions, playerPiecesPositions);
  }

  addUpRightAttacks(rowNumber, columnNumber, opponentPiecesPositions, playerPiecesPositions) {
    for (let i = rowNumber, j = columnNumber; i <= 8 && j <= 8; i++, j++) {
      if (i === rowNumber && j === columnNumber) {
        continue;
      }
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (playerPiecesPositions.includes(position)) {
        break;
      }
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addUpLeftAttacks(rowNumber, columnNumber, opponentPiecesPositions, playerPiecesPositions) {
    for (let i = rowNumber, j = columnNumber; i <= 8 && j >= 1; i++, j--) {
      if (i === rowNumber && j === columnNumber) {
        continue;
      }
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (playerPiecesPositions.includes(position)) {
        break;
      }
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addDownRightAttacks(rowNumber, columnNumber, opponentPiecesPositions, playerPiecesPositions) {
    for (let i = rowNumber, j = columnNumber; i >= 1 && j <= 8; i--, j++) {
      if (i === rowNumber && j === columnNumber) {
        continue;
      }
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (playerPiecesPositions.includes(position)) {
        break;
      }
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addDownLeftAttacks(rowNumber, columnNumber, opponentPiecesPositions, playerPiecesPositions) {
    for (let i = rowNumber, j = columnNumber; i >= 1 && j >= 1; i--, j--) {
      if (i === rowNumber && j === columnNumber) {
        continue;
      }
      const position = `${i}-${LETTER_MAPPED[j]}`;
      if (playerPiecesPositions.includes(position)) {
        break;
      }
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }
}