import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import {
  distinctUntilChanged,
  map,
  skipWhile,
  startWith,
  takeLast,
} from "rxjs/operators";
import {
  TicTacToeBoard,
  TicTacToeGameStateHistory,
  TicTacToePlayer,
} from "./game.models";

@Injectable()
export class GameService {
  private readonly gameStateHistory = new BehaviorSubject<
    TicTacToeGameStateHistory
  >([]);
  readonly squares: Observable<TicTacToeBoard>;
  readonly hasGameStarted: Observable<boolean>;
  readonly winner: Observable<TicTacToePlayer>;

  private currentStepNumber = 0;
  private currentPlayer: TicTacToePlayer = "X";

  constructor() {
    this.squares = this.gameStateHistory.pipe(
      skipWhile((history) => history.length < 1),
      map((history) => history[this.currentStepNumber]?.squares)
    );
    this.hasGameStarted = this.gameStateHistory.pipe(
      map((history) => history.length > 1),
      startWith(false),
      distinctUntilChanged()
    );
    this.winner = this.squares.pipe(
      map((squares) => this.calculateWinner(squares))
    );
  }

  init(size: number) {
    this.gameStateHistory.next([
      {
        squares: Array.from(
          { length: size * size },
          () => "" as TicTacToePlayer
        ),
        currentPlayer: this.currentPlayer,
      },
    ]);
  }

  play(index: number): void {}

  jumpTo(stepNumber: number): void {}

  private switchPlayer(currentPlayer: TicTacToePlayer): TicTacToePlayer {
    return currentPlayer === "X" ? "O" : "X";
  }

  private calculateWinner(squares: TicTacToeBoard): TicTacToePlayer | null {
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
        return squares[a];
      }
    }
    return null;
  }
}
