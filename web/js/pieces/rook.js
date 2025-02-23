class Rook {
  _position;
  _players;
  _moves;

  constructor(position, players) {
    this._position = position;
    this._players = players;
  }

  getPossibleMoves() {
    const possibleMoves = [];
    const [row, column] = this._position.split('-');
    const rowNumber = parseInt(row);
    const columnNumber = parseInt(getKeyByValue(LETTER_MAPPED, column));

    this._addUpMoves(possibleMoves, rowNumber, column);
    this._addDownMoves(possibleMoves, rowNumber, column);
    this._addLeftMoves(possibleMoves, row, columnNumber);
    this._addRightMoves(possibleMoves, row, columnNumber);

    return possibleMoves;
  }

  _addUpMoves(possibleMoves, rowNumber, column) {
    for (let i = rowNumber; i <= 8; i++) {
      if (i === rowNumber) {
        continue;
      }
      const position = `${i}-${column}`;
      if (this._containsPiece(position)) {
        break;
      }
      possibleMoves.push(position);
    }
  }

  _addDownMoves(possibleMoves, rowNumber, column) {
    for (let i = rowNumber; i >= 1; i--) {
      if (i === rowNumber) {
        continue;
      }
      const position = `${i}-${column}`;
      if (this._containsPiece(position)) {
        break;
      }
      possibleMoves.push(position);
    }
  }

  _addLeftMoves(possibleMoves, row, columnNumber) {
    for (let i = columnNumber; i >= 1; i--) {
      if (i === columnNumber) {
        continue;
      }
      const position = `${row}-${LETTER_MAPPED[i]}`;
      if (this._containsPiece(position)) {
        break;
      }
      possibleMoves.push(position);
    }
  }

  _addRightMoves(possibleMoves, row, columnNumber) {
    for (let i = columnNumber; i <= 8; i++) {
      if (i === columnNumber) {
        continue;
      }
      const position = `${row}-${LETTER_MAPPED[i]}`;
      if (this._containsPiece(position)) {
        break;
      }
      possibleMoves.push(position);
    }
  }

  getPossibleAttacks() {
    const possibleAttacks = [];
    return possibleAttacks;
  }

  _containsPiece(position) {
    const piecesPositions = [...Object.values(this._players[0].pieces), ...Object.values(this._players[1].pieces)];
    return piecesPositions.includes(position);
  }
}