class Rook {
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

  fillPossibleAttacks() {
    const [row, column] = this.position.split('-');
    const rowNumber = parseInt(row);
    const columnNumber = parseInt(getKeyByValue(LETTER_MAPPED, column));

    const opponentPiecesPositions = Object.values(this.players[1].pieces);
    const playerPiecesPositions = Object.values(this.players[0].pieces);

    this.addUpAttacks(rowNumber, column, opponentPiecesPositions, playerPiecesPositions);
    this.addDownAttacks(rowNumber, column, opponentPiecesPositions, playerPiecesPositions);
    this.addLeftAttacks(row, columnNumber, opponentPiecesPositions, playerPiecesPositions);
    this.addRightAttacks(row, columnNumber, opponentPiecesPositions, playerPiecesPositions);
  }

  addUpAttacks(rowNumber, column, opponentPiecesPositions, playerPiecesPositions) {
    for (let i = rowNumber; i <= 8; i++) {
      if (i === rowNumber) {
        continue;
      }
      const position = `${i}-${column}`;
      if (playerPiecesPositions.includes(position)) {
        break;
      }
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addDownAttacks(rowNumber, column, opponentPiecesPositions, playerPiecesPositions) {
    for (let i = rowNumber; i >= 1; i--) {
      if (i === rowNumber) {
        continue;
      }
      const position = `${i}-${column}`;
      if (playerPiecesPositions.includes(position)) {
        break;
      }
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addLeftAttacks(row, columnNumber, opponentPiecesPositions, playerPiecesPositions) {
    for (let i = columnNumber; i >= 1; i--) {
      if (i === columnNumber) {
        continue;
      }
      const position = `${row}-${LETTER_MAPPED[i]}`;
      if (playerPiecesPositions.includes(position)) {
        break;
      }
      if (opponentPiecesPositions.includes(position)) {
        this.possibleAttacks.push(position);
        break;
      }
    }
  }

  addRightAttacks(row, columnNumber, opponentPiecesPositions, playerPiecesPositions) {
    for (let i = columnNumber; i <= 8; i++) {
      if (i === columnNumber) {
        continue;
      }
      const position = `${row}-${LETTER_MAPPED[i]}`;
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