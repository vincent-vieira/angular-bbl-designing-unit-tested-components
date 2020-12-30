import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { SquareComponent } from './square/square.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [BoardComponent, SquareComponent],
  exports: [BoardComponent],
})
export class BoardComponentModule {}
