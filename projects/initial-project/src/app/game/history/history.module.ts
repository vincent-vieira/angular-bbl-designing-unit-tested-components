import { NgModule } from '@angular/core';
import { HistoryComponent } from './history.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HistoryComponent],
  exports: [HistoryComponent]
})
export class HistoryComponentModule {
}
