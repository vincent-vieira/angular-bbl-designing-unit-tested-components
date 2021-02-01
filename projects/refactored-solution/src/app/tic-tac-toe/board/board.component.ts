import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicTacToeBoard } from '../state/game.models';

@Component({
  selector: 'tic-tac-toe-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
})
export class TicTacToeBoardComponent {

  @Input()
  size: number;

  @Input()
  squares: TicTacToeBoard;

  @Output()
  squareClicked = new EventEmitter<number>();

  onSquareClicked(playIndex: number): void {
    this.squareClicked.emit(playIndex);
  }
}
