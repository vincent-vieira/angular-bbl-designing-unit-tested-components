import { NgModule } from '@angular/core';
import { TicTacToeSquareComponent } from './square.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [TicTacToeSquareComponent],
  exports: [TicTacToeSquareComponent]
})
export class TicTacToeSquareComponentModule {
}
