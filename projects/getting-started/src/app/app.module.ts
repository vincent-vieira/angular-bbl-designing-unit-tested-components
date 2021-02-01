import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TicTacToeGameModule } from './tic-tac-toe/game.module';
import { TicTacToeGameComponent } from './tic-tac-toe/game.component';

@NgModule({
  imports: [
    BrowserModule,
    TicTacToeGameModule
  ],
  bootstrap: [TicTacToeGameComponent]
})
export class AppModule { }
