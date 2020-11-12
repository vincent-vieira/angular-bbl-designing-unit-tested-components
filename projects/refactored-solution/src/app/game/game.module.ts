import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoardModule } from "./board/board.module";
import { GameComponent } from "./game.component";
import { GameService } from "./game.service";

@NgModule({
  imports: [BoardModule, CommonModule],
  declarations: [GameComponent],
  exports: [GameComponent],
  providers: [GameService],
})
export class GameModule {}
