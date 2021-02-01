import { TicTacToeGameService } from './game.service';

describe('Tic-tac-toe game service', () => {
  let gameService: TicTacToeGameService;
  beforeEach(async () => {
    gameService = new TicTacToeGameService();
  });

  describe('game state', () => {
    [[3, 9], [4, 16]].forEach(([size, expectedElementsCount]) => {
      describe(`with size ${size} * ${size}`, () => {
        it('should be initialized properly', () => {
          gameService.init(size);

          const squares = Array(expectedElementsCount).fill('');

          expect(gameService.squares).toEqual(squares);
          expect(gameService.nextPlayer).toBe('O');
          expect(gameService.historySize).toBe(1);
        });
      });
    });

    beforeEach(() => {
      gameService.init(3);
    });

    it('should evolve when adding a move and store squares & current player', () => {
      gameService.play(3);

      expect(gameService.historySize).toEqual(2);
      expect(gameService.nextPlayer).toEqual('X');
      expect(gameService.squares).toEqual(['', '', '', 'X', '', '', '', '', '']);
    });

    it('can be used to go back to a specific state and not reset further states', () => {
      gameService.play(3);
      gameService.play(5);

      gameService.jumpTo(1);

      expect(gameService.squares).toEqual(['', '', '', 'X', '', '', '', '', '']);
    });

    it('should reset further states when playing a new move after jumping to a previous state', () => {
      gameService.play(3);
      gameService.play(5);
      gameService.play(7);

      gameService.jumpTo(2);

      gameService.play(4);

      expect(gameService.squares).toEqual(['', '', '', 'X', 'O', 'O', '', '', '']);
    });
  });

  describe('winner', () => {
    beforeEach(() => {
      gameService.init(3);
    });

    it('should be initialized properly', () => {
      expect(gameService.winner).toBeNull();
    });

    it('should evolve when winning conditions are met', () => {
      gameService.play(0);
      gameService.play(4);
      gameService.play(1);
      gameService.play(7);
      gameService.play(2);

      expect(gameService.winner).toBe('X');
    });
  });

  describe('next player', () => {
    beforeEach(() => {
      gameService.init(3);
    });

    it('should be initialized properly', () => {
      expect(gameService.nextPlayer).toBe('O');
    });

    it('should evolve from \'X\' to \'O\'', () => {
      gameService.play(3);

      expect(gameService.nextPlayer).toBe('X');
    });

    it('should evolve from \'O\' to \'X\'', () => {
      gameService.play(3);
      gameService.play(5);

      expect(gameService.nextPlayer).toBe('O');
    });

    it('should be reset by navigation from history', () => {
      gameService.play(3);
      gameService.play(5);
      gameService.play(7);

      gameService.jumpTo(4);
      gameService.play(4);

      expect(gameService.nextPlayer).toBe('O');
    });
  });

  it('should expose a flag showing that game has not yet started', () => {
    gameService.init(3);

    expect(gameService.hasGameStarted).toBe(false);
  });

  it('should expose a flag showing that game has started', () => {
    gameService.init(3);
    gameService.play(3);

    expect(gameService.hasGameStarted).toBe(true);
  });
});
