import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TicTacToeBoard } from "../game.models";

@Component({
  selector: "tic-tac-toe-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.sass"],
})
export class BoardComponent implements OnInit {
  @Input()
  size: number;

  @Input()
  squares: TicTacToeBoard;

  @Output()
  squareClicked = new EventEmitter<number>();

  ngOnInit(): void {
    if (this.size * this.size !== this.squares.length) {
      throw new Error("Board size and input squares size not being coherent");
    }
  }

  onSquareClicked(playIndex: number): void {
    this.squareClicked.emit(playIndex);
  }
}
