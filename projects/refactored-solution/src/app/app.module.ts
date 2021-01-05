import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GameComponentModule } from './game/game.module';
import { GameComponent } from './game/game.component';

@NgModule({
  imports: [
    BrowserModule,
    GameComponentModule
  ],
  bootstrap: [GameComponent]
})
export class AppModule { }
