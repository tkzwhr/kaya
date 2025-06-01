import type { NodeObject } from "@sabaki/immutable-gametree";
import { describe, expect, it } from "vitest";
import { ArrayUtils, NodeUtils, PointStateUtils } from "./utils.ts";

describe("PointStateUtils", () => {
  describe("fromSign", () => {
    it("should return stone color", () => {
      expect(PointStateUtils.fromSign(1)).toBe("B");
      expect(PointStateUtils.fromSign(-1)).toBe("W");
      expect(PointStateUtils.fromSign(0)).toBeUndefined();
    });
  });
});

describe("NodeUtils", () => {
  describe("nextMove", () => {
    it("should return next move", () => {
      const nodeB: NodeObject = {
        id: 0,
        parentId: null,
        children: [],
        data: {
          B: ["aa"],
        },
      };
      expect(NodeUtils.nextMove(nodeB)).toStrictEqual({
        color: "B",
        pos: "aa",
      });

      const nodeW = {
        id: 1,
        parentId: null,
        children: [],
        data: {
          W: ["bb"],
        },
      };
      expect(NodeUtils.nextMove(nodeW)).toStrictEqual({
        color: "W",
        pos: "bb",
      });

      const nodeU = {
        id: 2,
        parentId: null,
        children: [],
        data: {
          W: [],
        },
      };
      expect(NodeUtils.nextMove(nodeU)).toBeUndefined();
    });
  });
});

describe("ArrayUtils", () => {
  describe("mapSquare", () => {
    it("should return data", () => {
      const expected = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      const result = ArrayUtils.mapSquare(3, (r, c) => r * 3 + c + 1);

      expect(result).toStrictEqual(expected);
    });
  });
});
