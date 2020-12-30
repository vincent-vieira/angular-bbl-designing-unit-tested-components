import { NgModule } from '@angular/core';
import { RangePipe } from './range.pipe';

@NgModule({
  declarations: [RangePipe],
  exports: [RangePipe]
})
export class SharedModule {
}
