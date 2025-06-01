import type { NodeObject } from "@sabaki/immutable-gametree";
import type { StoneColor } from "./types.ts";

export const PointStateUtils = {
  fromSign: (sign: 1 | -1 | 0): StoneColor => {
    switch (sign) {
      case 1:
        return "B";
      case -1:
        return "W";
      case 0:
        return undefined;
    }
  },
};

export const NodeUtils = {
  nextMove: (
    node: NodeObject,
  ): { color: "B"; pos: string } | { color: "W"; pos: string } | undefined => {
    if (node.data?.B?.[0]) {
      return {
        color: "B",
        pos: node.data.B[0],
      };
    }
    if (node.data?.W?.[0]) {
      return {
        color: "W",
        pos: node.data.W[0],
      };
    }
    return undefined;
  },
};

export const ArrayUtils = {
  mapSquare: <T>(size: number, f: (r: number, c: number) => T): T[][] => {
    const arr: T[][] = [];
    for (let r = 0; r < size; ++r) {
      arr.push([]);
      for (let c = 0; c < size; ++c) {
        arr[r].push(f(r, c));
      }
    }
    return arr;
  },
};
