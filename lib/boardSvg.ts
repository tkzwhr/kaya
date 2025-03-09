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
import wh from "./res/wh.svg?raw";

export default class BoardSvg {
  private readonly element: HTMLDivElement;

  constructor(
    appendTo: HTMLElement,
    private boardSize: number,
    private position: [number, number],
  ) {
    const el = document.createElement("div");

    appendTo.appendChild(el);

    this.element = el;

    this.putStone(null);
  }

  public putStone(color: "black" | "white" | null) {
    if (color) {
      if (color === "black") {
        this.element.innerHTML = bl;
      } else {
        this.element.innerHTML = wh;
      }

      this.applyStyle();

      return;
    }

    const [r, c] = this.position;
    if (r === 0) {
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
