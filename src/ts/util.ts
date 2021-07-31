import { browser, Tabs } from "webextension-polyfill-ts";

/**
 * Checks if the tab is opening a web page (instead of a page like chrome://*).
 */
function isWebPage(tab: Tabs.Tab): boolean {
  return (tab.url ?? "").startsWith("http");
}

/**
 * Gets the url of tabs on current window (excluding pinned tabs).
 */
export async function getPageURLs(): Promise<string[]> {
  const tabs = await browser.tabs.query({ pinned: false, currentWindow: true });
  const urls = tabs.flatMap((tab) => (isWebPage(tab) ? [tab.url ?? ""] : []));

  return urls;
}
