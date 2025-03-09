import Kaya from "../lib";

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  const container = document.createElement("div");
  container.style.width = "500px";

  const kaya = new Kaya(container);

  setTimeout(() => {
    kaya.putStone("black", [3, 5]);
  }, 2000);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (window as any).kaya = kaya;

  app.appendChild(container);
}
