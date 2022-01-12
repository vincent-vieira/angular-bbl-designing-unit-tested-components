import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicTacToeGameComponent } from './game.component';
import { TicTacToeGameService } from './game.service';
import { TicTacToeGameStateHistoryComponentModule } from './state/history/state-history.module';

@NgModule({
  imports: [
    CommonModule,
    TicTacToeGameStateHistoryComponentModule,
    // TicTacToeBoardComponentModule,
    // TicTacToeGameInfoComponentModule
  ],
  declarations: [TicTacToeGameComponent],
  exports: [TicTacToeGameComponent],
  providers: [TicTacToeGameService],
})
export class TicTacToeGameModule {}
