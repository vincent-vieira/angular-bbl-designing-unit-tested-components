import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicTacToeBoardComponentModule } from '../board/board.module';
import { TicTacToeGameComponent } from './game.component';
import { TicTacToeGameService } from './game.service';
import { TicTacToeGameStateHistoryComponentModule } from './state/history/state-history.module';
import { TicTacToeGameInfoComponentModule } from './info/game-info.module';

@NgModule({
  imports: [
    TicTacToeBoardComponentModule,
    CommonModule,
    TicTacToeGameStateHistoryComponentModule,
    TicTacToeGameInfoComponentModule,
  ],
  declarations: [TicTacToeGameComponent],
  exports: [TicTacToeGameComponent],
  providers: [TicTacToeGameService],
})
export class TicTacToeGameModule {}
