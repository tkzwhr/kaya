import { SGFController } from "./SGFController.ts";
import type BoardSvg from "./boardSvg.ts";
import { createBoardSvgs } from "./boardSvg.ts";

export type KayaOptions = {
  sgfText?: string;
  enableKeyboard?: boolean;
  enableWheel?: boolean;
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

    if (options?.enableKeyboard === undefined || options?.enableKeyboard) {
      inner.tabIndex = 1;
      inner.addEventListener("keydown", (ev) => this._handleKeyboard(ev));
    }

    if (options?.enableWheel === undefined || options?.enableWheel) {
      inner.addEventListener("wheel", (ev) => {
        ev.preventDefault();
        this.handleWheel(ev);
      });
    }

    this.boardSvgs = createBoardSvgs(inner, boardSize);

    this._syncBoard();

    parent.appendChild(inner);
  }

  public navigate(steps: number) {
    this.sgfController?.navigate(steps);
    this._syncBoard();
  }

  private _handleKeyboard(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      if (event.shiftKey) {
        this.navigate(5);
      } else {
        this.navigate(1);
      }
    } else if (event.key === "ArrowLeft") {
      if (event.shiftKey) {
        this.navigate(-5);
      }
      this.navigate(-1);
    }
  }

  private handleWheel(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.navigate(1);
    } else if (event.deltaY < 0) {
      this.navigate(-1);
    }
  }

  private _syncBoard() {
    if (this.sgfController === undefined) return;

    const board = this.sgfController.currentBoard();
    for (let r = 0; r < this.sgfController.boardSize; ++r) {
      for (let c = 0; c < this.sgfController.boardSize; ++c) {
        this.boardSvgs[r][c].putStone(board[r][c].sign);
      }
    }
  }
}
