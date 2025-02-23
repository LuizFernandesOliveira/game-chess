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
  }

  getPossibleAttacks() {
    const possibleAttacks = [];
    return possibleAttacks;
  }
}