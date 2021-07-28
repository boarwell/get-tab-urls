/**
 * Checks if the tab is opening a web page (instead of a page like chrome://*).
 */
function isWebPage(tab: chrome.tabs.Tab): boolean {
  return (tab.url ?? "").startsWith("http");
}

/**
 * Gets the url of tabs on current window (excluding pinned tabs).
 */
async function getPageURLs(): Promise<string[]> {
  const tabs = await chrome.tabs.query({ pinned: false, currentWindow: true });
  const urls = tabs.flatMap((tab) => (isWebPage(tab) ? [tab.url ?? ""] : []));

  return urls;
}

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
})();
