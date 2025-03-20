import SabakiGoBoard from "@sabaki/go-board";
// @ts-ignore
import SabakiImmutableGameTree from "@sabaki/immutable-gametree";
// @ts-ignore
import * as SabakiSgf from "@sabaki/sgf";
import type { BoardStatus } from "./types.ts";
import { ArrayUtils, NodeUtils, PointStateUtils } from "./utils.ts";

type Game = {
  nodeId: number;
  board: SabakiGoBoard;
};

export class SGFController {
  public readonly boardSize: number = 0;
  // biome-ignore lint/suspicious/noExplicitAny: has no types
  private gameTree: any;
  private games: Game[] = [];

  // biome-ignore lint/suspicious/noExplicitAny: has no types
  private constructor(node: any) {
    this.boardSize = Number.parseInt(node.data.SZ);

    this.gameTree = new SabakiImmutableGameTree({
      root: node,
    });

    const initialStones = {
      AB: new Set<string>(),
      AW: new Set<string>(),
    };
    if (Array.isArray(node.data.AB)) {
      for (const pos of node.data.AB) {
        initialStones.AB.add(pos);
      }
    }
    if (Array.isArray(node.data.AW)) {
      for (const pos of node.data.AW) {
        initialStones.AW.add(pos);
      }
    }

    const goBoard: (1 | -1 | 0)[][] = ArrayUtils.mapSquare(
      this.boardSize,
      (r, c) => {
        const pos = SabakiSgf.stringifyVertex([c, r]);
        if (initialStones.AB.has(pos)) {
          return 1;
        }
        if (initialStones.AW.has(pos)) {
          return -1;
        }
        return 0;
      },
    );
    this.games = [
      {
        nodeId: 0,
        board: new SabakiGoBoard(goBoard),
      },
    ];
  }

  static new(sgfText: string | undefined): SGFController | undefined {
    if (sgfText === undefined) return undefined;

    const sgfNodes = SabakiSgf.parse(sgfText);
    if (sgfNodes.length !== 1) return undefined;

    return new SGFController(sgfNodes[0]);
  }

  public currentBoard(): BoardStatus {
    const game = this._fetchLastGame();

    return ArrayUtils.mapSquare(this.boardSize, (r, c) => ({
      sign: PointStateUtils.fromSign(game.board.signMap[r][c]),
      markup: undefined,
    }));
  }

  public navigateNext() {
    const lastNode =
      this.gameTree.get(this._fetchLastGame().nodeId) ?? undefined;
    if (lastNode === undefined) return;

    const nextNode = this.gameTree.navigate(lastNode.id, 1, {}) ?? undefined;
    if (nextNode === undefined) return;

    const nextMove = NodeUtils.nextMove(nextNode);
    if (nextMove === undefined) {
      const board = this._fetchLastGame().board.clone();
      this.games.push({
        nodeId: nextNode.id,
        board,
      });
      return;
    }

    const color = nextMove.color === "B" ? 1 : -1;
    const vertex = SabakiSgf.parseVertex(nextMove.pos);
    const board = this._fetchLastGame().board.makeMove(color, vertex);
    this.games.push({
      nodeId: nextNode.id,
      board,
    });
  }

  public navigatePrevious() {
    if (this.games.length >= 2) {
      this.games.pop();
    }
  }

  private _fetchLastGame(): Game {
    const lastGame = this.games.at(-1);
    if (lastGame === undefined)
      throw new Error("Illegal State: Last game not found");

    return lastGame;
  }
}
