import bl from "./res/bl.svg?raw";
import cb from "./res/cb.svg?raw";
import cc from "./res/cc.svg?raw";
import ct from "./res/ct.svg?raw";
import lb from "./res/lb.svg?raw";
import lc from "./res/lc.svg?raw";
import lt from "./res/lt.svg?raw";
import rb from "./res/rb.svg?raw";
import rc from "./res/rc.svg?raw";
import rt from "./res/rt.svg?raw";
import st from "./res/st.svg?raw";
import wh from "./res/wh.svg?raw";
import type { StoneColor } from "./types.ts";
import { ArrayUtils } from "./utils.ts";

const STARS: Record<number, [number, number][]> = {
  9: [[5, 5]],
  13: [
    [4, 4],
    [4, 10],
    [7, 7],
    [10, 4],
    [10, 10],
  ],
  19: [
    [4, 4],
    [4, 10],
    [4, 16],
    [10, 4],
    [10, 10],
    [10, 16],
    [16, 4],
    [16, 10],
    [16, 16],
  ],
};

export default class BoardSvg {
  private readonly element: HTMLDivElement;
  private color: StoneColor;

  constructor(
    appendTo: HTMLElement,
    private boardSize: number,
    private position: [number, number],
  ) {
    const el = document.createElement("div");

    appendTo.appendChild(el);

    this.element = el;

    this._putStone(undefined, true);
  }

  public putStone(color: StoneColor) {
    this._putStone(color, false);
  }

  private _putStone(color: StoneColor, forced: boolean) {
    if (!forced && this.color === color) return;
    this.color = color;

    if (color) {
      if (color === "B") {
        this.element.innerHTML = bl;
      } else {
        this.element.innerHTML = wh;
      }

      this.applyStyle();

      return;
    }

    const [r, c] = this.position;
    if (STARS[this.boardSize]?.some((v) => v[0] === r + 1 && v[1] === c + 1)) {
      this.element.innerHTML = st;
    } else if (r === 0) {
      if (c === 0) {
        this.element.innerHTML = lt;
      } else if (c === this.boardSize - 1) {
        this.element.innerHTML = rt;
      } else {
        this.element.innerHTML = ct;
      }
    } else if (r === this.boardSize - 1) {
      if (c === 0) {
        this.element.innerHTML = lb;
      } else if (c === this.boardSize - 1) {
        this.element.innerHTML = rb;
      } else {
        this.element.innerHTML = cb;
      }
    } else {
      if (c === 0) {
        this.element.innerHTML = lc;
      } else if (c === this.boardSize - 1) {
        this.element.innerHTML = rc;
      } else {
        this.element.innerHTML = cc;
      }
    }

    this.applyStyle();
  }

  private applyStyle() {
    const svg = this.element.querySelector("svg");
    if (svg) {
      svg.style.verticalAlign = "bottom";
    }
  }
}

export function createBoardSvgs(
  appendTo: HTMLElement,
  boardSize: number,
): BoardSvg[][] {
  return ArrayUtils.mapSquare(
    boardSize,
    (r, c) => new BoardSvg(appendTo, boardSize, [r, c]),
  );
}
