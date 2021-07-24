function isWebPageTab(tab: chrome.tabs.Tab): boolean {
  if (tab.url == undefined) {
    return false;
  }

  return tab.url.startsWith("http");
}

async function getPageURLs(): Promise<string[]> {
  const tabs = await chrome.tabs.query({ pinned: false, currentWindow: true });
  const webPageTabs = tabs.filter(isWebPageTab);

  return webPageTabs.map((tab) => tab.url ?? "").filter(Boolean);
}

(async function main() {
  const textarea = document.querySelector("textarea");
  if (textarea == undefined) {
    return;
  }

  const urls = await getPageURLs();
  textarea.textContent = urls.join("\n");
})();
