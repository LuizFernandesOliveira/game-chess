const SQUARES = 8;
const POSSIBLE_POSITIONS = [
  '1-a', '1-b', '1-c', '1-d', '1-e', '1-f', '1-g', '1-h',
  '2-a', '2-b', '2-c', '2-d', '2-e', '2-f', '2-g', '2-h',
  '3-a', '3-b', '3-c', '3-d', '3-e', '3-f', '3-g', '3-h',
  '4-a', '4-b', '4-c', '4-d', '4-e', '4-f', '4-g', '4-h',
  '5-a', '5-b', '5-c', '5-d', '5-e', '5-f', '5-g', '5-h',
  '6-a', '6-b', '6-c', '6-d', '6-e', '6-f', '6-g', '6-h',
  '7-a', '7-b', '7-c', '7-d', '7-e', '7-f', '7-g', '7-h',
  '8-a', '8-b', '8-c', '8-d', '8-e', '8-f', '8-g', '8-h',
]
const LETTER_MAPPED = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h',
}
const INITIAL_POSITION_PLAYER_ONE = {
  KING: '1-e',
  QUEEN: '1-d',
  ROOK_LEFT: '1-a',
  ROOK_RIGHT: '1-h',
  BISHOP_LEFT: '1-c',
  BISHOP_RIGHT: '1-f',
  KNIGHT_LEFT: '1-b',
  KNIGHT_RIGHT: '1-g',
  PAWN_1: '2-a',
  PAWN_2: '2-b',
  PAWN_3: '2-c',
  PAWN_4: '2-d',
  PAWN_5: '2-e',
  PAWN_6: '2-f',
  PAWN_7: '2-g',
  PAWN_8: '2-h',
}
const INITIAL_POSITION_PLAYER_TWO = {
  KING: '8-e',
  QUEEN: '8-d',
  ROOK_LEFT: '8-a',
  ROOK_RIGHT: '8-h',
  BISHOP_LEFT: '8-c',
  BISHOP_RIGHT: '8-f',
  KNIGHT_LEFT: '8-b',
  KNIGHT_RIGHT: '8-g',
  PAWN_1: '7-a',
  PAWN_2: '3-b',
  PAWN_3: '7-c',
  PAWN_4: '7-d',
  PAWN_5: '7-e',
  PAWN_6: '7-f',
  PAWN_7: '7-g',
  PAWN_8: '7-h',
}
const PIECES_LABEL = {
  KING: 'king',
  QUEEN: 'queen',
  ROOK_LEFT: 'rook',
  ROOK_RIGHT: 'rook',
  BISHOP_LEFT: 'bishop',
  BISHOP_RIGHT: 'bishop',
  KNIGHT_LEFT: 'knight',
  KNIGHT_RIGHT: 'knight',
  PAWN_1: 'pawn',
  PAWN_2: 'pawn',
  PAWN_3: 'pawn',
  PAWN_4: 'pawn',
  PAWN_5: 'pawn',
  PAWN_6: 'pawn',
  PAWN_7: 'pawn',
  PAWN_8: 'pawn',
}
const USER = {
  name: 'nando',
}
const OPPONENT = {
  name: 'opponent',
}

const getElementById = (id) => document.getElementById(id);


function fillBoard() {
  const boardElement = getElementById('board');
  for (let i = 1; i <= SQUARES; i++) {
    for (let j = 1; j <= SQUARES; j++) {
      const squareElement = document.createElement('div');
      const position = `${i}-${LETTER_MAPPED[j]}`;
      squareElement.id = position;
      squareElement.className = 'square';
      squareElement.className = squareElement.className + ((i % 2 === 0) === (j % 2 === 0) ? ' even' : ' odd');
      boardElement.append(squareElement);
    }
  }
}

function markSelectedPiece(piece, position) {
  removeClass('selected-piece')
  const squareElement = getElementById(position);
  squareElement.className = squareElement.className + ' selected-piece';
}


function getPossibleMoves(piece, position, game) {
  switch (piece) {
    case 'PAWN_1':
    case 'PAWN_2':
    case 'PAWN_3':
    case 'PAWN_4':
    case 'PAWN_5':
    case 'PAWN_6':
    case 'PAWN_7':
    case 'PAWN_8': {
      return new Pawn(position, game.players).getPossibleMoves();
    }
    default:
      return [];
  }
}

function getAttacks(piece, position, game) {
  switch (piece) {
    case 'PAWN_1':
    case 'PAWN_2':
    case 'PAWN_3':
    case 'PAWN_4':
    case 'PAWN_5':
    case 'PAWN_6':
    case 'PAWN_7':
    case 'PAWN_8': {
      return new Pawn(position, game.players).getPossibleAttacks();
    }
    default:
      return [];
  }
}

function markSquares(piece, position, game) {
  removeClass('possible-move');
  const possibleMovesPositions = getPossibleMoves(piece, position, game);
  possibleMovesPositions.forEach((position) => {
    const squareElement = getElementById(position);
    squareElement.className = squareElement.className + ' possible-move';
  });

  removeClass('possible-attack');
  const possibleAttacksPositions = getAttacks(piece, position, game);
  possibleAttacksPositions.forEach((position) => {
    const squareElement = getElementById(position);
    squareElement.className = squareElement.className + ' possible-attack';
  });
}

function fillPieces(game) {
  game.players.forEach((player, index) => {
    Object.keys(player.pieces).forEach((piece) => {
      const position = player.pieces[piece];
      const label = PIECES_LABEL[piece];
      const squareElement = getElementById(position);
      const pieceElement = document.createElement('button');
      pieceElement.id = piece + '-' + player.color;
      pieceElement.className = 'piece-' + label + ' ' + player.color;
      pieceElement.textContent = label;
      if (player.user.name === USER.name) {
        pieceElement.onclick = () => {
          markSelectedPiece(piece, position);
          markSquares(piece, position, game);
        }
      }
      squareElement.append(pieceElement);
    });
  });
}

window.onload = () => {
  setProperties()
  const game = {
    players: [
      {
        user: USER,
        pieces: { ...INITIAL_POSITION_PLAYER_ONE },
        color: 'player-white'
      },
      {
        user: OPPONENT,
        pieces: {...INITIAL_POSITION_PLAYER_TWO},
        color: 'player-black'
      }
    ],
  };

  fillBoard();
  fillPieces(game);
};