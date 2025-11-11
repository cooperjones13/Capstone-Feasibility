document.addEventListener("DOMContentLoaded", async () => {
  // Get the active tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Inject content.js into the active tab
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  // Send message to content script
  chrome.tabs.sendMessage(tab.id, { action: "getH1" }, (response) => {
    document.getElementById("output").textContent =
      response?.titleText || "No Title found";
  });
});
