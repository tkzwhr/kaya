import { SGFController } from "./SGFController.ts";
import type BoardSvg from "./boardSvg.ts";
import { createBoardSvgs } from "./boardSvg.ts";

export type KayaOptions = {
  sgfText?: string;
};

export class Kaya {
  private boardSvgs: BoardSvg[][] = [];
  private readonly sgfController: SGFController | undefined = undefined;

  constructor(parent: HTMLElement, options?: KayaOptions) {
    this.sgfController = SGFController.new(options?.sgfText);

    const boardSize = this.sgfController?.boardSize ?? 19;

    const inner = document.createElement("div");
    inner.style.display = "grid";
    inner.style.width = `round(down, 100%, ${boardSize}px)`;
    inner.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    this.boardSvgs = createBoardSvgs(inner, boardSize);

    this.syncBoard();

    parent.appendChild(inner);
  }

  public navigate(steps: number) {
    this.sgfController?.navigate(steps);
    this.syncBoard();
  }

  private syncBoard() {
    if (this.sgfController === undefined) return;

    const board = this.sgfController.currentBoard();
    for (let r = 0; r < this.sgfController.boardSize; ++r) {
      for (let c = 0; c < this.sgfController.boardSize; ++c) {
        this.boardSvgs[r][c].putStone(board[r][c].sign);
      }
    }
  }
}
