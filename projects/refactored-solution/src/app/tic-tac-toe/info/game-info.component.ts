import { Component, Input } from '@angular/core';
import { TicTacToePlayer } from '../state/game.models';

@Component({
  selector: 'tic-tac-toe-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.sass']
})
export class TicTacToeGameInfoComponent {

  @Input()
  winner?: TicTacToePlayer;

  @Input()
  nextPlayer: TicTacToePlayer;
}
