import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  get status(): string {
    return this.winner
      ? `Winner: ${this.winner}`
      : `Next player: ${AppComponent.computeNextPlayer(this.currentPlayer)}`;
  }

  get squares(): string[] {
    return this.history[this.stepNumber]?.squares;
  }

  hasGameStarted = false;

  currentPlayer = 'X';

  history: Array<{ squares: string[]; currentPlayer: string }> = [
    { squares: Array(9).fill(undefined), currentPlayer: 'X' },
  ];

  private stepNumber = 0;

  private winner: string;

  private static calculateWinner(squares): string | null {
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

  private static computeNextPlayer(currentPlayer: string): string {
    return currentPlayer === 'X' ? 'O' : 'X';
  }

  squareClicked(squareIndex: number): void {
    if (!this.hasGameStarted) {
      this.hasGameStarted = true;
    }

    const history = this.history.slice(0, this.stepNumber + 1);
    let squares = [...this.squares.slice()];

    const hasSquareBeenPlayed = !!squares[squareIndex];
    if (this.winner || hasSquareBeenPlayed) {
      return;
    }

    squares = this.squares.map((square, index) => {
      if (index === squareIndex) {
        return this.currentPlayer;
      }
      return square;
    });

    this.stepNumber += 1;
    this.history = [...history, { squares, currentPlayer: this.currentPlayer }];
    this.currentPlayer = AppComponent.computeNextPlayer(this.currentPlayer);
    this.winner = AppComponent.calculateWinner(squares);
  }

  jumpTo(stepNumber: number): void {
    this.stepNumber = stepNumber;
    this.currentPlayer = this.history[stepNumber].currentPlayer;
  }
}

@Component({
  selector: 'app-square',
  styles: [
    `
      .square {
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin-right: -1px;
        margin-top: -1px;
        padding: 0;
        text-align: center;
        width: 34px;
        outline: none;
      }
    `,
  ],
  template: `<button [ngClass]="'square'" (click)="clicked.emit()">
    {{ value }}
  </button>`,
})
export class SquareComponent {
  @Input()
  value: string;

  @Output()
  clicked = new EventEmitter<void>();
}

@Component({
  selector: 'app-board',
  styles: [
    `
      .board-row:after {
        clear: both;
        content: '';
        display: table;
      }
    `,
  ],
  template: ` <div>
    <div [ngClass]="'board-row'">
      <app-square
        *ngFor="let i of [0, 1, 2]"
        [value]="squares[i]"
        (clicked)="squareClicked.emit(i)"
      ></app-square>
    </div>
    <div [ngClass]="'board-row'">
      <app-square
        *ngFor="let i of [3, 4, 5]"
        [value]="squares[i]"
        (clicked)="squareClicked.emit(i)"
      ></app-square>
    </div>
    <div [ngClass]="'board-row'">
      <app-square
        *ngFor="let i of [6, 7, 8]"
        [value]="squares[i]"
        (clicked)="squareClicked.emit(i)"
      ></app-square>
    </div>
  </div>`,
})
export class BoardComponent {
  @Input()
  squares: string[];

  @Output()
  squareClicked = new EventEmitter<number>();
}
