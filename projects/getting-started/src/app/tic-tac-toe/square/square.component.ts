import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicTacToePlayer } from '../game/state/game.models';

@Component({
  selector: 'tic-tac-toe-square',
  styleUrls: ['./square.component.sass'],
  templateUrl: './square.component.html',
})
export class TicTacToeSquareComponent {
  @Input()
  value: TicTacToePlayer;

  @Output()
  clicked = new EventEmitter<void>();
}
