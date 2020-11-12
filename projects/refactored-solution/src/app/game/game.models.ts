export type TicTacToePlayer = "X" | "O";
export type TicTacToeBoard = Array<TicTacToePlayer>;
export type TicTacToeGameState = {
  squares: TicTacToeBoard;
  currentPlayer: TicTacToePlayer;
};
export type TicTacToeGameStateHistory = Array<TicTacToeGameState>;
