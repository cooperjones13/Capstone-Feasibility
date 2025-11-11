chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getH1") {
    const videoTitleElement = document.querySelector(".yt-lockup-metadata-view-model__text-container h3");
    const titleText = videoTitleElement ? videoTitleElement.innerText.trim() : "No YT Video Found";
    sendResponse({ titleText });
  }
  return true; // Keeps message channel open for async response
});
