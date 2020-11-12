import { Component } from "@angular/core";
import { GameService } from "./game.service";

@Component({
  selector: "tic-tac-toe-game",
  templateUrl: "./game.component.html",
})
export class GameComponent {
  readonly size: number = 3;
  constructor(readonly gameService: GameService) {
    gameService.init(this.size);
  }
}
