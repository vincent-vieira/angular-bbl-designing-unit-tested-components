import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicTacToeBoardComponentModule } from './board/board.module';
import { TicTacToeGameComponent } from './game.component';
import { TicTacToeGameService } from './game.service';
import { GameStateHistoryComponentModule } from './state/history/state-history.module';
import { GameInfoComponentModule } from './info/game-info.module';

@NgModule({
  imports: [TicTacToeBoardComponentModule, CommonModule, GameStateHistoryComponentModule, GameInfoComponentModule],
  declarations: [TicTacToeGameComponent],
  exports: [TicTacToeGameComponent],
  providers: [TicTacToeGameService],
})
export class TicTacToeGameModule {
}