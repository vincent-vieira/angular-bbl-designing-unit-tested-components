import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tic-tac-toe-history',
  templateUrl: './state-history.component.html',
  styleUrls: ['./state-history.component.sass']
})
export class GameStateHistoryComponent {

  @Input()
  size: number;

  @Output()
  navigateTo = new EventEmitter<number>();
}
