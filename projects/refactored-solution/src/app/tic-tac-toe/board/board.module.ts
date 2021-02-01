import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicTacToeBoardComponent } from './board.component';
import { SharedModule } from '../../shared/shared.module';
import { TicTacToeSquareComponentModule } from '../square/square.module';

@NgModule({
  imports: [CommonModule, SharedModule, TicTacToeSquareComponentModule],
  declarations: [TicTacToeBoardComponent],
  exports: [TicTacToeBoardComponent],
})
export class TicTacToeBoardComponentModule {
}
