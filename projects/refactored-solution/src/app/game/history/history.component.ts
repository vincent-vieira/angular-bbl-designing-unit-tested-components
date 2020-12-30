import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tic-tac-toe-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})
export class HistoryComponent {

  @Input()
  size: number;

  @Output()
  navigateTo = new EventEmitter<number>();
}
