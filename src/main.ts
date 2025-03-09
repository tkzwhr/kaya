import "./style.css";
import { setupCounter } from "../lib";
import typescriptLogo from "./typescript.svg";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

  const counter = document.querySelector<HTMLButtonElement>("#counter");
  if (counter) {
    setupCounter(counter);
  }
}
