import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TicTacToeGameModule } from './tic-tac-toe/game/game.module';
import { TicTacToeGameComponent } from './tic-tac-toe/game/game.component';

@NgModule({
  imports: [BrowserModule, TicTacToeGameModule],
  bootstrap: [TicTacToeGameComponent],
})
export class AppModule {}
