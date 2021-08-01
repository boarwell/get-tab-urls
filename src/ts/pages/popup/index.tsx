import { h, render, FunctionComponent } from "preact";

import { URLs } from "../../components/URLs";
import { getPageURLs, useURLs, closeAllTabs } from "../../util";

async function writeURLsToClipboard(): Promise<void> {
  const urls = await getPageURLs();
  await navigator.clipboard.writeText(urls.join("\n"));
}

const Page: FunctionComponent = () => {
  const urls = useURLs();

  return (
    <div class="page-popup">
      <div class="page-popup__row -heading">
        <h1 class="page-popup__heading">Tabs on the current window:</h1>
      </div>

      <div class="page-popup__row -urls">
        <URLs urls={urls} />
      </div>

      <div class="page-popup__row -hr">
        <hr className="page-popup__hr" />
      </div>

      <div class="page-popup__row -actions">
        <div class="page-popup__actions">
          <div class="page-popup__action">
            <button type="button" onClick={writeURLsToClipboard}>
              Write URLs to clipboard
            </button>
          </div>

          <div class="page-popup__action">
            <button type="button" onClick={closeAllTabs}>
              Close these tabs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

(async function main() {
  const root = document.querySelector("#root");
  if (root !== null) {
    render(<Page />, root);
  }
})();
