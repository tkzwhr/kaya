import BoardSvg from "./boardSvg.ts";

export default class Kaya {
  private boardSvgs: BoardSvg[][] = [];

  constructor(el: HTMLElement | undefined | null) {
    if (!el) return;

    const boardSize = 9;

    const inner = document.createElement("div");
    inner.style.display = "grid";
    inner.style.width = `round(down, 100%, ${boardSize}px)`;
    inner.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    const rows: BoardSvg[][] = [];
    for (let r = 0; r < boardSize; ++r) {
      const columns: BoardSvg[] = [];
      for (let c = 0; c < boardSize; ++c) {
        const boardSvg = new BoardSvg(inner, boardSize, [r, c]);
        columns.push(boardSvg);
      }
      rows.push(columns);
    }
    this.boardSvgs = rows;

    el.appendChild(inner);
  }

  public putStone(color: "black" | "white" | null, position: [number, number]) {
    const [r, c] = position;
    this.boardSvgs[r][c].putStone(color);
  }
}
