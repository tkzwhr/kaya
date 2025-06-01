import Kaya from "../lib";

function createBoard(parent: HTMLElement, sgfText: string) {
  const container = document.createElement("div");
  container.style.width = "500px";

  const kaya = new Kaya(container, { sgfText });

  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.onclick = (_ev: MouseEvent) => {
    kaya.navigate(-1);
  };
  container.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.onclick = (_ev: MouseEvent) => {
    kaya.navigate(1);
  };
  container.appendChild(nextButton);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const windowKaya = (window as any).kaya;

  if (Array.isArray(windowKaya)) {
    windowKaya.push(kaya);
  } else {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (window as any).kaya = [kaya];
  }

  parent.appendChild(container);
}

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  createBoard(app, "(;GM[1]FF[4]SZ[9];B[aa];W[ba];B[bb];W[ab];B[];W[])");
  createBoard(app, "(;GM[1]FF[4]SZ[13];B[aa];W[ba];B[bb];W[ab];B[];W[])");
  createBoard(app, "(;GM[1]FF[4]SZ[19];B[aa];W[ba];B[bb];W[ab];B[];W[])");
}
