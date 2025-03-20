import Kaya from "../lib";

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  const container = document.createElement("div");
  container.style.width = "500px";

  const kaya = new Kaya(container, {
    sgfText: "(;GM[1]FF[4]SZ[9];B[aa];W[ba];B[bb];W[ab];B[];W[])",
  });

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
  (window as any).kaya = kaya;

  app.appendChild(container);
}
