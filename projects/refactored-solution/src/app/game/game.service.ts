import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject, zip } from 'rxjs';
import { map, mergeAll, scan, skipWhile, startWith, windowToggle, withLatestFrom } from 'rxjs/operators';
import { TicTacToeBoard, TicTacToePlayer } from './game.models';

type TicTacToeGameState = {
  squares: TicTacToeBoard;
  currentPlayer: TicTacToePlayer;
};
type TicTacToeGameStateHistory = Array<TicTacToeGameState>;
type TicTacToeGamePlay = { player: TicTacToePlayer, index: number };

const gameStateHistoryBuilder = (accumulator,
                                 [gamePlay, size, currentStepNumber]: [TicTacToeGamePlay, number, number]): TicTacToeGameStateHistory => {
  const {player: currentPlayer, index: playIndex} = gamePlay;

  if (accumulator.length === 0) {
    const initialSquares = Array.from(
      {length: size * size},
      () => '' as TicTacToePlayer
    );
    const squares = Array.from(
      {length: size * size},
      (_, index) => index === playIndex ? currentPlayer : '' as TicTacToePlayer
    );
    return [
      ...accumulator,
      {currentPlayer, squares: initialSquares},
      {currentPlayer, squares}
    ];
  } else {
    const lastMoves = [...accumulator.slice(0, currentStepNumber + 1)];
    const lastMove = lastMoves[lastMoves.length - 1].squares;
    const squares = lastMove.map((playerOnSquare, index) => {
      if (index === playIndex && playerOnSquare === '') {
        return currentPlayer;
      }
      return playerOnSquare;
    });

    return [
      ...accumulator,
      {currentPlayer, squares}
    ];
  }
};

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
      return squares[a];
    }
  }
  return null;
};

@Injectable()
export class GameService {

  private readonly currentStepNumber = new BehaviorSubject<number>(0);
  private readonly currentPlayer = new BehaviorSubject<TicTacToePlayer>('X');
  private readonly plays = new ReplaySubject<TicTacToeGamePlay>(1);
  private readonly boardSize = new ReplaySubject<number>(1);

  readonly squares: Observable<TicTacToeBoard>;
  readonly hasGameStarted: Observable<boolean>;
  readonly winner: Observable<TicTacToePlayer>;
  readonly historySize: Observable<number>;

  constructor() {
    const gameMoves = combineLatest([
      zip(this.plays, this.currentStepNumber),
      this.boardSize
    ]).pipe(
      map(([[gameState, currentStepNumber], size]) => [gameState, size, currentStepNumber] as [TicTacToeGamePlay, number, number])
    );

    const currentGameState = gameMoves.pipe(
      scan(gameStateHistoryBuilder, [] as TicTacToeGameStateHistory)
    );

    this.squares = currentGameState.pipe(
      withLatestFrom(this.currentStepNumber),
      map(([history, currentStepNumber]) => history[currentStepNumber + 1]?.squares),
      startWith([])
    );
    this.historySize = currentGameState.pipe(map(history => history.length));
    this.hasGameStarted = this.historySize.pipe(map(size => size > 1));

    /*this.winner = this.squares.pipe(
      filter(squares => squares && squares.length > 0),
      map(squares => calculateWinner(squares)),
      tap(value => console.log(value))
    );*/
  }

  init(size: number): void {
    this.boardSize.next(size);
  }

  play(squareIndex: number): void {
    this.plays.next({player: this.currentPlayer.value, index: squareIndex});
    // FIXME : dont allow overlapping positions and going to next step
    this.currentPlayer.next(this.currentPlayer.value === 'X' ? 'O' : 'X');
    this.currentStepNumber.next(this.currentStepNumber.value + 1);
  }

  jumpTo(stepNumber: number): void {
    this.currentStepNumber.next(stepNumber);
  }
}
