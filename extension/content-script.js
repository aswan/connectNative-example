
chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (msg.command == "get") {
    let editor = document.getElementById("wpTextbox1");
    let text = editor ? editor.textContent : null;

    // XXX replace text / disable submit button
    
    reply(text);
  } else if (msg.command == "set") {
    let editor = document.getElementById("wpTextbox1");
    if (editor) {
      editor.textContent = msg.contents;
    }
  }
});
