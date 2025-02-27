const USER = {}

const OPPONENT = {
  name: 'opponent',
}

const getElementById = (id) => document.getElementById(id);

function fillUser(user) {
  const panelElement = getElementById('users');
  const userElement = document.createElement('li');
  userElement.textContent = user.name;
  panelElement.append(userElement);
}


function fillBoard() {
  const boardElement = getElementById('board');
  for (let i = 1; i <= SQUARES; i++) {
    for (let j = 1; j <= SQUARES; j++) {
      const squareElement = document.createElement('div');
      squareElement.id = `${i}-${LETTER_MAPPED[j]}`;
      squareElement.className = 'square';
      squareElement.className = squareElement.className + ((i % 2 === 0) === (j % 2 === 0) ? ' even' : ' odd');
      boardElement.append(squareElement);
    }
  }
}

function markSelectedPiece(piece, position) {
  removeClass(CLASS_NAMES.SELECTED_PIECE)
  const squareElement = getElementById(position);
  appendClass(squareElement, CLASS_NAMES.SELECTED_PIECE);
}

function getObjectPieces(piece, position, game) {
  switch (piece) {
    case 'PAWN_1':
    case 'PAWN_2':
    case 'PAWN_3':
    case 'PAWN_4':
    case 'PAWN_5':
    case 'PAWN_6':
    case 'PAWN_7':
    case 'PAWN_8': return new Pawn(position, game.players);
    case 'KNIGHT_LEFT':
    case 'KNIGHT_RIGHT': return new Knight(position, game.players);
    case 'ROOK_LEFT':
    case 'ROOK_RIGHT': return new Rook(position, game.players);
    case 'BISHOP_LEFT':
    case 'BISHOP_RIGHT': return new Bishop(position, game.players);
    case 'QUEEN': return new Queen(position, game.players);
    case 'KING': return new King(position, game.players);
    default:
      throw new Error('Piece not found');
  }
}

function markSquaresPossibleMoves(piece, position, game) {
  const pieces = getObjectPieces(piece, position, game);

  removeClass(CLASS_NAMES.POSSIBLE_MOVE);
  pieces.possibleMoves.forEach((position) => {
    const squareElement = getElementById(position);
    appendClass(squareElement, CLASS_NAMES.POSSIBLE_MOVE);
  });

  removeClass(CLASS_NAMES.POSSIBLE_ATTACK);
  pieces.possibleAttacks.forEach((position) => {
    const squareElement = getElementById(position);
    appendClass(squareElement, CLASS_NAMES.POSSIBLE_ATTACK);
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
          markSquaresPossibleMoves(piece, position, game);
        }
      }
      squareElement.append(pieceElement);
    });
  });
}

function setFormEvent() {
  const form = getElementById('form');
  form.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    USER.name = name;
    USER.id = crypto.randomUUID();

    const game = {
      players: [
        {
          user: USER,
          pieces: { ...INITIAL_POSITION_PLAYER_WHITE },
          color: 'player-white'
        },
        {
          user: OPPONENT,
          pieces: {...INITIAL_POSITION_PLAYER_BLACK},
          color: 'player-black'
        }
      ],
      history: []
    };

    fillUser(USER);
    fillPieces(game);
    startWebSocket(USER);
  }
}

function setEvents() {
  setFormEvent();
}

window.onload = () => {
  setProperties();
  setEvents();

  fillBoard();
};