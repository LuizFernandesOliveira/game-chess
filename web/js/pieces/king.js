class King {
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

    this.addUpMoves(rowNumber, columnNumber);
    this.addDownMoves(rowNumber, columnNumber);
    this.addLeftMoves(rowNumber, columnNumber);
    this.addRightMoves(rowNumber, columnNumber);
    this.addUpRightMoves(rowNumber, columnNumber);
    this.addUpLeftMoves(rowNumber, columnNumber);
    this.addDownRightMoves(rowNumber, columnNumber);
    this.addDownLeftMoves(rowNumber, columnNumber);
  }

  addUpMoves(rowNumber, columnNumber) {
    if (rowNumber < 8) {
      const position = `${rowNumber + 1}-${LETTER_MAPPED[columnNumber]}`;
      if (!containsPiecePosition(this, position)) {
        this.possibleMoves.push(position);
      }
    }
  }

  addDownMoves(rowNumber, columnNumber) {
    if (rowNumber > 1) {
      const position = `${rowNumber - 1}-${LETTER_MAPPED[columnNumber]}`;
      if (!containsPiecePosition(this, position)) {
        this.possibleMoves.push(position);
      }
    }
  }

  addLeftMoves(row, columnNumber) {
    if (columnNumber > 1) {
      const position = `${row}-${LETTER_MAPPED[columnNumber - 1]}`;
      if (!containsPiecePosition(this, position)) {
        this.possibleMoves.push(position);
      }
    }
  }

  addRightMoves(row, columnNumber) {
    if (columnNumber < 8) {
      const position = `${row}-${LETTER_MAPPED[columnNumber + 1]}`;
      if (!containsPiecePosition(this, position)) {
        this.possibleMoves.push(position);
      }
    }
  }

  addUpRightMoves(rowNumber, columnNumber) {
    if (rowNumber < 8 && columnNumber < 8) {
      const position = `${rowNumber + 1}-${LETTER_MAPPED[columnNumber + 1]}`;
      if (!containsPiecePosition(this, position)) {
        this.possibleMoves.push(position);
      }
    }
  }

  addUpLeftMoves(rowNumber, columnNumber) {
    if (rowNumber < 8 && columnNumber > 1) {
      const position = `${rowNumber + 1}-${LETTER_MAPPED[columnNumber - 1]}`;
      if (!containsPiecePosition(this, position)) {
        this.possibleMoves.push(position);
      }
    }
  }

  addDownRightMoves(rowNumber, columnNumber) {
    if (rowNumber > 1 && columnNumber < 8) {
      const position = `${rowNumber - 1}-${LETTER_MAPPED[columnNumber + 1]}`;
      if (!containsPiecePosition(this, position)) {
        this.possibleMoves.push(position);
      }
    }
  }

  addDownLeftMoves(rowNumber, columnNumber) {
    if (rowNumber > 1 && columnNumber > 1) {
      const position = `${rowNumber - 1}-${LETTER_MAPPED[columnNumber - 1]}`;
      if (!containsPiecePosition(this, position)) {
        this.possibleMoves.push(position);
      }
    }
  }

  fillPossibleAttacks() {
    const [row, column] = this.position.split('-');
    const rowNumber = parseInt(row);
    const columnNumber = parseInt(getKeyByValue(LETTER_MAPPED, column));
    const opponentPiecesPositions = Object.values(this.players[1].pieces);

    const attacks = [
      `${rowNumber + 1}-${LETTER_MAPPED[columnNumber]}`,
      `${rowNumber - 1}-${LETTER_MAPPED[columnNumber]}`,
      `${rowNumber}-${LETTER_MAPPED[columnNumber - 1]}`,
      `${rowNumber}-${LETTER_MAPPED[columnNumber + 1]}`,
      `${rowNumber + 1}-${LETTER_MAPPED[columnNumber + 1]}`,
      `${rowNumber + 1}-${LETTER_MAPPED[columnNumber - 1]}`,
      `${rowNumber - 1}-${LETTER_MAPPED[columnNumber + 1]}`,
      `${rowNumber - 1}-${LETTER_MAPPED[columnNumber - 1]}`,
    ];

    attacks.forEach((attack) => {
      if (opponentPiecesPositions.includes(attack)) {
        this.possibleAttacks.push(attack);
      }
    });
  }
}