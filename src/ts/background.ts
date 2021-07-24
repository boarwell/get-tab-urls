chrome.runtime.onInstalled.addListener(async () => {
  const tabs = await chrome.tabs.query({ pinned: false });
  const webPageTabs = tabs.filter((tab) => tab.url?.startsWith("http"));

  console.log(webPageTabs);
});
