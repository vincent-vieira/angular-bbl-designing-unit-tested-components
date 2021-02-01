import { Component, OnInit } from '@angular/core';
import { TicTacToeGameService } from './game.service';

@Component({
  selector: 'tic-tac-toe-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class TicTacToeGameComponent implements OnInit{
  readonly size: number = 3;

  constructor(public readonly gameService: TicTacToeGameService) {}

  ngOnInit(): void {
    this.gameService.init(this.size);
  }
}
