import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TicTacToeGameComponentModule } from './tic-tac-toe/game.module';
import { TicTacToeGameComponent } from './tic-tac-toe/game.component';

@NgModule({
  imports: [
    BrowserModule,
    TicTacToeGameComponentModule
  ],
  bootstrap: [TicTacToeGameComponent]
})
export class AppModule { }
