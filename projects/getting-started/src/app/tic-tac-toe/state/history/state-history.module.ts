import { NgModule } from '@angular/core';
import { GameStateHistoryComponent } from './state-history.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [GameStateHistoryComponent],
  exports: [GameStateHistoryComponent]
})
export class GameStateHistoryComponentModule {
}
