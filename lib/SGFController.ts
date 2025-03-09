// @ts-ignore
import SabakiGoBoard from "@sabaki/go-board";
// @ts-ignore
import SabakiImmutableGameTree from "@sabaki/immutable-gametree";
// @ts-ignore
import * as SabakiSgf from "@sabaki/sgf";

export class SGFController {
  public readonly boardSize: number = 0;
  // biome-ignore lint/suspicious/noExplicitAny: has no types
  private gameTree: any;
  // biome-ignore lint/suspicious/noExplicitAny: has no types
  private goBoards: any[] = [];
  private currentNodeIds: number[] = [0];

  constructor(sgfText: string) {
    const sgfNodes = SabakiSgf.parse(sgfText);
    if (sgfNodes.length === 0) return;

    const rootNode = sgfNodes[0];
    this.boardSize = Number.parseInt(rootNode.data.SZ);

    this.gameTree = new SabakiImmutableGameTree({
      root: rootNode,
    });

    const goBoard: (1 | -1 | 0)[][] = [];
    for (let r = 0; r < this.boardSize; ++r) {
      const goBoardSub: (1 | -1 | 0)[] = [];
      for (let c = 0; c < this.boardSize; ++c) {
        goBoardSub.push(0);
      }
      goBoard.push(goBoardSub);
    }
    this.goBoards = [new SabakiGoBoard(goBoard)];
  }

  public currentBoard(): (1 | -1 | 0)[][] {
    return this.goBoards[this.goBoards.length - 1].signMap;
  }

  public navigateNext() {
    const lastNode = this.gameTree.get(
      this.currentNodeIds[this.currentNodeIds.length - 1],
    );
    const nextNode = this.gameTree.navigate(lastNode.id, 1, {}) ?? undefined;
    if (nextNode === undefined) return;

    if (nextNode.data?.B?.[0]) {
      const vertex = SabakiSgf.parseVertex(nextNode.data.B[0]);
      const nextGoBoard = this.goBoards[this.goBoards.length - 1].makeMove(
        1,
        vertex,
      );
      this.goBoards.push(nextGoBoard);
    } else if (nextNode.data?.W?.[0]) {
      const vertex = SabakiSgf.parseVertex(nextNode.data.W[0]);
      const nextGoBoard = this.goBoards[this.goBoards.length - 1].makeMove(
        -1,
        vertex,
      );
      this.goBoards.push(nextGoBoard);
    } else {
      const nextGoBoard = this.goBoards[this.goBoards.length - 1].clone();
      this.goBoards.push(nextGoBoard);
    }

    this.currentNodeIds.push(nextNode.id);
  }

  public navigatePrevious() {
    if (this.currentNodeIds.length < 2) return;

    this.goBoards.pop();
    this.currentNodeIds.pop();
  }
}
