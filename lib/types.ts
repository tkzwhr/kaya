export type StoneColor = "B" | "W" | undefined;

export type PointState = {
  sign: StoneColor;
  markup: undefined; // reserved
};

export type BoardStatus = PointState[][];
