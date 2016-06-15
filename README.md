## wikimacs

This project contains a simple webextension to illustrate the use of
[native messaging](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/connectNative).
The webextension creates a
[page action](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/pageAction)
that is activated when editing wiki pages on https://wiki.mozilla.org/.
When the page action icon is clicked, the extension extracts the
raw wiki markup from the page and launches the
[emacs](http://www.gnu.org/software/emacs/) editor on a temporary file
containing the wiki markup.
After editing the file and exiting emacs, the new contents are sent
back to the webextension where they are placed into the editor on the
original web page where they can be previewed, submitted, etc.

## How to use it

The native application included here only works on MacOS and it
requires that emacs has already been installed in `/Applications/Emacs.app`.
You'll also need Firefox version 50 or newer (which as of June 2016 is
only available in [nightly builds](https://nightly.mozilla.org/).

First, to make the native application usable from Firefox, copy
`wikimacs.json` from this directory into
`~/Library/Application Support/Mozilla/NativeMessaingHosts/wikimacs.json`.
Edit the copy so that the `path` property contains the full path to
`wikimacs.py` from this directory.

Then, start Firefox and navigate to [about:debugging](about:debugging).
Click the "Load Temporary Add-on" button and select any file from
the `extension/` subdirectory of this directory in the file chooser.
You should see "wikimacs" appear in the list of installed extensions.

To actually use it, navigate to any page on https://wiki.mozilla.org
and click on the "Edit" button (you need to be logged in to a wiki
account for this option to appear).  A new instances of emacs should be
launched.

## Questions?

Head on over to
[irc://irc.mozilla.org/webextensions](#webextensions on irc.mozilla.org).
