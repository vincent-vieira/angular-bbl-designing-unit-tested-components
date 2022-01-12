import { TicTacToePlayer } from '../state/game.models';

describe('Game info component', () => {
  const players: TicTacToePlayer[] = ['X', 'O'];

  beforeEach(async () => {
    fail('implement this');
  });

  describe('when winner is absent', () => {
    players.forEach((player) => {
      it(`should display the next player "${player}" if set`, () => {
        fail('implement this');
      });

      it(`should not display the winner "${player}"`, () => {
        fail('implement this');
      });
    });
  });

  players.forEach((player) => {
    describe(`when winner is set as player "${player}"`, () => {
      it('should not display the next player even if it is set', () => {
        fail('implement this');
      });

      it('should display the winner', () => {
        fail('implement this');
      });
    });
  });
});
