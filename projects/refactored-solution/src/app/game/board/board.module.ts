import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoardComponent } from "./board.component";
import { RangePipe } from "./range.pipe";
import { SquareComponent } from "./square/square.component";

@NgModule({
  imports: [CommonModule],
  declarations: [BoardComponent, SquareComponent, RangePipe],
  exports: [BoardComponent, RangePipe],
})
export class BoardModule {}
