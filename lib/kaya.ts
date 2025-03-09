import { SGFController } from "./SGFController.ts";
import type BoardSvg from "./boardSvg.ts";
import { createBoardSvgs } from "./boardSvg.ts";

export type KayaOptions = {
  sgfText?: string;
};

export class Kaya {
  private boardSvgs: BoardSvg[][] = [];
  private readonly sgfController: SGFController | undefined = undefined;

  constructor(el: HTMLElement | undefined, options?: KayaOptions) {
    if (el === undefined) return;

    if (options?.sgfText) {
      this.sgfController = new SGFController(options.sgfText);
    }

    const boardSize = this.sgfController?.boardSize ?? 19;

    const inner = document.createElement("div");
    inner.style.display = "grid";
    inner.style.width = `round(down, 100%, ${boardSize}px)`;
    inner.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    this.boardSvgs = createBoardSvgs(inner, boardSize);

    this.syncBoard();

    el.appendChild(inner);
  }

  public navigateNext() {
    this.sgfController?.navigateNext();
    this.syncBoard();
  }

  public navigatePrevious() {
    this.sgfController?.navigatePrevious();
    this.syncBoard();
  }

  private syncBoard() {
    if (this.sgfController === undefined) return;

    const signMap = this.sgfController.currentBoard();

    for (let r = 0; r < this.sgfController.boardSize; ++r)
      for (let c = 0; c < this.sgfController.boardSize; ++c) {
        switch (signMap[r][c]) {
          case 1:
            this.boardSvgs[r][c].putStone("black");
            break;
          case -1:
            this.boardSvgs[r][c].putStone("white");
            break;
          default:
            this.boardSvgs[r][c].putStone(undefined);
        }
      }
  }
}
