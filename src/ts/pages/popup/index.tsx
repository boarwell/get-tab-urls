import { h, render, FunctionComponent, Fragment } from "preact";
import { useState } from "preact/hooks";

import { URLs } from "../../components/URLs";

import { getPageURLs, useOnMount } from "../../util";

async function writeURLsToClipboard(): Promise<void> {
  const urls = await getPageURLs();
  await navigator.clipboard.writeText(urls.join("\n"));
}

const Page: FunctionComponent = () => {
  const [urls, setURLs] = useState<string[]>([]);
  useOnMount(async () => {
    const pageURLs = await getPageURLs();
    setURLs(pageURLs);
  });

  return (
    <Fragment>
      <h1>Tabs on the current window:</h1>

      <URLs urls={urls} />

      <button type="button" id="clipboard-write" onClick={writeURLsToClipboard}>
        Write URLs to clipboard
      </button>
    </Fragment>
  );
};

(async function main() {
  const root = document.querySelector("#root");
  if (root !== null) {
    render(<Page />, root);
  }
})();
