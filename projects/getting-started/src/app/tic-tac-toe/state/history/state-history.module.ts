import { NgModule } from '@angular/core';
import { TicTacToeGameStateHistoryComponent } from './state-history.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [TicTacToeGameStateHistoryComponent],
  exports: [TicTacToeGameStateHistoryComponent]
})
export class TicTacToeGameStateHistoryComponentModule {
}
