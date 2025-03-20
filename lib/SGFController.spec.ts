import { describe, expect, it } from "vitest";
import { SGFController } from "./SGFController.ts";
import type { BoardStatus } from "./types.ts";

const sgfText =
  "(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[5]AB[cb][bd]PL[W];W[dc];B[cd];W[])";
const sgfText2 = "(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.52.2]KM[6.5]SZ[5]AW[cc])";

function serialize(board: BoardStatus | undefined): string[] {
  const res = [];
  let i = 0;
  for (const r of board ?? []) {
    res.push("");
    for (const c of r) {
      if (c.sign !== undefined) {
        res[i] += c.sign;
      } else {
        res[i] += "+";
      }
    }
    i += 1;
  }
  return res;
}

describe("new", () => {
  it("should return undefined", () => {
    const result1 = SGFController.new(undefined);
    expect(result1).toBeUndefined();

    const result2 = SGFController.new("");
    expect(result2).toBeUndefined();
  });

  it("should return object", () => {
    const result1 = SGFController.new(sgfText);
    expect(result1).toBeInstanceOf(SGFController);
  });
});

describe("currentBoard", () => {
  it("should return last game (AB)", () => {
    const sgfController = SGFController.new(sgfText);
    const result = sgfController?.currentBoard();

    expect(serialize(result)).toStrictEqual([
      "+++++",
      "++B++",
      "+++++",
      "+B+++",
      "+++++",
    ]);
  });

  it("should return last game (AW)", () => {
    const sgfController = SGFController.new(sgfText2);
    const result = sgfController?.currentBoard();

    expect(serialize(result)).toStrictEqual([
      "+++++",
      "+++++",
      "++W++",
      "+++++",
      "+++++",
    ]);
  });
});

describe("navigate", () => {
  it("should return next game", () => {
    const sgfController = SGFController.new(sgfText);

    sgfController?.navigate(1);
    const result1 = sgfController?.currentBoard();

    expect(serialize(result1)).toStrictEqual([
      "+++++",
      "++B++",
      "+++W+",
      "+B+++",
      "+++++",
    ]);

    sgfController?.navigate(9);
    const result2 = sgfController?.currentBoard();

    expect(serialize(result2)).toStrictEqual([
      "+++++",
      "++B++",
      "+++W+",
      "+BB++",
      "+++++",
    ]);
  });

  it("should return previous game", () => {
    const sgfController = SGFController.new(sgfText);
    sgfController?.navigate(9);

    sgfController?.navigate(-1);
    const result1 = sgfController?.currentBoard();

    expect(serialize(result1)).toStrictEqual([
      "+++++",
      "++B++",
      "+++W+",
      "+BB++",
      "+++++",
    ]);

    sgfController?.navigate(-9);
    const result2 = sgfController?.currentBoard();

    expect(serialize(result2)).toStrictEqual([
      "+++++",
      "++B++",
      "+++++",
      "+B+++",
      "+++++",
    ]);
  });
});
