
// should we display our page action for the given url?
let RE = /^https?:\/\/wiki.mozilla.org\/.*action=edit/;
function maybeDisplay(tab) {
  if (tab.url && RE.test(tab.url)) {
    browser.pageAction.show(tab.id);
  }
}

// When we're first loaded, activate page action in any edit tabs
browser.tabs.query({url: "*://wiki.mozilla.org/*"})
  .then(tabs => {
    for (let tab of tabs) {
      maybeDisplay(tab);
    }
  });

// Activate the page action on new tabs or when the url changes
browser.tabs.onCreated.addListener(tab => { maybeDisplay(tab); });
browser.tabs.onUpdated.addListener((id, info, tab) => { maybeDisplay(tab); });

let port = browser.runtime.connectNative("wikimacs");
port.onDisconnect.addListener(() => {
  console.log("oh no, native app closed");
});

let portWaiter = null;
port.onMessage.addListener(msg => {
  console.log(`got ${msg}`);
  if (!portWaiter) {
    console.log("huh received message without a waiter");
    port.disconnect();
    return;
  }

  let callback = portWaiter;
  portWaiter = null;
  callback(msg);
});

function edit(payload) {
  if (portWaiter) {
    return Promise.reject({message: "there is already an active edit"});
  }

  return new Promise(resolve => {
    portWaiter = resolve;
    port.postMessage(payload);
  });
}

browser.pageAction.onClicked.addListener(tab => {
  browser.tabs.sendMessage(tab.id, {command: "get"}, {})
    .then(contents => {
      if (!contents) {
        Cu.reportError("content script could not extract text");
      }
      return edit(contents);
    })
    .then(contents => {
      browser.tabs.sendMessage(tab.id, {command: "set", contents});
    });
});
