import { h, render } from "preact";

import { getPageURLs } from "../util";

(async function main() {
  const textarea = document.querySelector("textarea");
  if (textarea == undefined) {
    return;
  }

  const clipboard = document.querySelector("#clipboard-write");
  if (clipboard == undefined) {
    return;
  }

  clipboard.addEventListener("click", async () => {
    const urls = await getPageURLs();
    await navigator.clipboard.writeText(urls.join("\n"));
  });

  const urls = await getPageURLs();
  textarea.textContent = urls.join("\n");

  const root = document.querySelector("#root");
  if (root !== null) {
    render(<div>Ohayo Nippon</div>, root);
  }
})();
