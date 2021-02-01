import { NgModule } from '@angular/core';
import { GameInfoComponent } from './game-info.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [GameInfoComponent],
  exports: [GameInfoComponent]
})
export class GameInfoComponentModule {
}
