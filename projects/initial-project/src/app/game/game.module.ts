import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardComponentModule } from './board/board.module';
import { GameComponent } from './game.component';
import { GameService } from './game.service';
import { HistoryComponentModule } from './history/history.module';
import { InfoComponentModule } from './info/info.module';

@NgModule({
  imports: [BoardComponentModule, CommonModule, HistoryComponentModule, InfoComponentModule],
  declarations: [GameComponent],
  exports: [GameComponent],
  providers: [GameService],
})
export class GameComponentModule {}
