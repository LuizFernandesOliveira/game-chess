const SQUARES = 8;
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
  PAWN_2: '7-b',
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

function fillPieces(game) {
  game.players.forEach((player, index) => {
    Object.keys(player.pieces).forEach((piece) => {
      const position = player.pieces[piece];
      const label = PIECES_LABEL[piece];
      const squareElement = getElementById(position);
      squareElement.innerText = label + '-' + player.color;
    });
  });
}

window.onload = () => {
  const game = {
    players: [
      {
        pieces: { ...INITIAL_POSITION_PLAYER_ONE },
        color: 'white'
      },
      {
        pieces: {...INITIAL_POSITION_PLAYER_TWO},
        color: 'black'
      }
    ],
  };

  fillBoard();
  fillPieces(game);
};