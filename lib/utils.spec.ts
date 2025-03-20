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
      const nodeB = {
        data: {
          B: ["aa"],
        },
      };
      expect(NodeUtils.nextMove(nodeB)).toStrictEqual({
        color: "B",
        pos: "aa",
      });

      const nodeW = {
        data: {
          W: ["bb"],
        },
      };
      expect(NodeUtils.nextMove(nodeW)).toStrictEqual({
        color: "W",
        pos: "bb",
      });

      const nodeU = {
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
