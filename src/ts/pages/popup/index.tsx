import { h, render, FunctionComponent, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import { getPageURLs } from "../../util";

async function writeURLsToClipboard(): Promise<void> {
  const urls = await getPageURLs();
  await navigator.clipboard.writeText(urls.join("\n"));
}

const Page: FunctionComponent = () => {
  const [val, setVal] = useState("");
  useEffect(() => {
    getPageURLs().then((urls) => {
      setVal(urls.join("\n"));
    });
  }, []);

  return (
    <Fragment>
      <h1>日本語</h1>
      <textarea name="urls" id="urls" cols={30} rows={10}>
        {val}
      </textarea>

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
