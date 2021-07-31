import { browser, Tabs } from "webextension-polyfill-ts";
import { useEffect, useRef, useState } from "preact/hooks";

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

/**
 * Run the function once on mount.
 *
 * @see https://github.com/reactwg/react-18/discussions/19
 */
export function useOnMount(f: () => unknown) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      return;
    }

    f();
    setMounted(true);
  }, [mounted]);
}

/**
 * getPageURLs() in React Hook
 */
export function useURLs(): string[] {
  const [urls, setURLs] = useState<string[]>([]);

  useEffect(() => {
    getPageURLs().then((pageURLs) => {
      setURLs(pageURLs);
    });
  });

  return urls;
}
