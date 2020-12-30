import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'tic-tac-toe-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit{
  readonly size: number = 3;

  constructor(public readonly gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.init(this.size);
  }
}
