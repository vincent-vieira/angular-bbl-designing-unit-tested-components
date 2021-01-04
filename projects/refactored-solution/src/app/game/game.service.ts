import { Injectable } from '@angular/core';
import { TicTacToeBoard, TicTacToePlayer } from './game.models';

type TicTacToeGameState = {
  squares: TicTacToeBoard;
  currentPlayer: TicTacToePlayer;
};
type TicTacToeGameStateHistory = Array<TicTacToeGameState>;

const calculateWinner = (squares: TicTacToeBoard): TicTacToePlayer | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a] as TicTacToePlayer;
    }
  }
  return null;
};

const switchPlayer = (currentPlayer: TicTacToePlayer): TicTacToePlayer => {
  return currentPlayer === 'X' ? 'O' : 'X';
};

@Injectable()
export class GameService {

  private history: TicTacToeGameStateHistory = [];
  private currentPlayer: TicTacToePlayer;
  private currentStepNumber: number;

  get squares(): TicTacToeBoard {
    return this.history[this.currentStepNumber]?.squares || [];
  }

  get nextPlayer(): TicTacToePlayer {
    return switchPlayer(this.currentPlayer);
  }

  get winner(): TicTacToePlayer | null {
    return calculateWinner(this.squares);
  }

  get hasGameStarted(): boolean {
    return this.historySize > 1;
  }

  get historySize(): number {
    return this.history.length;
  }

  init(size: number): void {
    this.currentStepNumber = 0;
    this.currentPlayer = 'X';
    this.history = [
      {
        squares: Array.from(
          {length: size * size},
          () => '' as TicTacToePlayer
        ),
        currentPlayer: this.currentPlayer
      }
    ];
  }

  play(squareIndex: number): void {
    if (this.winner) {
      return;
    }

    const newSquares = this.squares.map((currentPlayer, index) => {
      if (squareIndex === index && !currentPlayer) {
        return this.currentPlayer;
      }
      return currentPlayer;
    });

    this.history = [
      ...this.history.slice(0, this.currentStepNumber + 1),
      {squares: newSquares, currentPlayer: this.currentPlayer}
    ];
    this.currentPlayer = switchPlayer(this.currentPlayer);
    this.currentStepNumber += 1;
  }

  jumpTo(stepNumber: number): void {
    this.currentStepNumber = stepNumber;
  }
}
