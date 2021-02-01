import { Component, Input } from '@angular/core';
import { TicTacToePlayer } from '../game.models';

@Component({
  selector: 'tic-tac-toe-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass']
})
export class InfoComponent {

  @Input()
  winner?: TicTacToePlayer;

  @Input()
  nextPlayer: TicTacToePlayer;
}
