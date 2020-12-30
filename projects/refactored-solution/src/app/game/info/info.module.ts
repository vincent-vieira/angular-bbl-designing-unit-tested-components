import { NgModule } from '@angular/core';
import { InfoComponent } from './info.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [InfoComponent],
  exports: [InfoComponent]
})
export class InfoComponentModule {
}
