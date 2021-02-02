import { NgModule } from '@angular/core';
import { TicTacToeGameInfoComponent } from './game-info.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [TicTacToeGameInfoComponent],
  exports: [TicTacToeGameInfoComponent]
})
export class TicTacToeGameInfoComponentModule {
}
