<p align="center">
  <a href="https://github.com/roedesh/copyguard">
    <img src="public/assets/icon128.png" alt="Logo" width="80" height="80">
  </a>


  <h3 align="center">Copy Guard</h3>

  <p align="center">
    A simple browser extension that warns you when your copy action was hijacked.
  </p>
  
  <p align="center">
    <a href="https://chrome.google.com/webstore/detail/copy-guard/kobgknfkonpcnijbmjpepfonpnkeefij"><img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/kobgknfkonpcnijbmjpepfonpnkeefij"></a>
    <a href="https://addons.mozilla.org/firefox/addon/copy-guard/"><img alt="Mozilla Add-on" src="https://img.shields.io/amo/v/copy-guard"></a>
    <a href="https://microsoftedge.microsoft.com/addons/detail/copy-guard/nkdddmepblpmknbobcpebakjehldaebj"><img alt="Edge Add-on" src="https://img.shields.io/badge/edge%20add--on-v1.3.0-blue"></a>
  </p>

  <p align="center">
    <img src="copyguard-gif.gif" alt="Copy Guard demo" />
  </p>
</p>

## About

**[Read the blog post for more in-depth info](https://ruud.je/blog/always-double-check-what-you-copy-from-websites/)**

This extension warns you whenever your copy action was hijacked. When you select text and copy it, this extension will check if your clipboard data was altered by Javascript, or if your text selection contains hidden elements. If either one is the case, a native notification will be triggered.

Available for the following browsers:

<a href="https://chrome.google.com/webstore/detail/copy-guard/kobgknfkonpcnijbmjpepfonpnkeefij"><img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/kobgknfkonpcnijbmjpepfonpnkeefij"></a>
<a href="https://addons.mozilla.org/firefox/addon/copy-guard/"><img alt="Mozilla Add-on" src="https://img.shields.io/amo/v/copy-guard"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/copy-guard/nkdddmepblpmknbobcpebakjehldaebj"><img alt="Edge Add-on" src="https://img.shields.io/badge/edge%20add--on-v1.3.0-blue"></a>


## Features

- [x] Warns you when JavaScript alters your clipboard data after copying
- [x] Warns you when the selection you copied contains hidden elements
- [x] Whitelist websites
- [x] Export list of website that altered your clipboard

## Building

1.  Clone repo
2.  `bun run install`
3.  `bun run dev` to run the dev task in watch mode
4.  `bun run build` to build a production (minified) version

## Testing in Chrome

1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome or [_brave://extensions_](brave://extensions) in Brave.
3.  With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this repo

## Testing in Firefox

1.  Complete the steps to build the project above
2.  Run `bun run start:firefox` and a Firefox window will open with the extension installed.
