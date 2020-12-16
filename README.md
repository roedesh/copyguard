<p align="center">
  <a href="https://github.com/roedesh/copyguard">
    <img src="dist/icon48.png" alt="Logo" width="80" height="80">
  </a>


  <h3 align="center">Copy Guard</h3>

  <p align="center">
    A simple browser extension that warns you when your copy action was hijacked.
  </p>
  
  <p align="center">
    <a href="https://chrome.google.com/webstore/detail/copy-guard/kobgknfkonpcnijbmjpepfonpnkeefij"><img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/v/kobgknfkonpcnijbmjpepfonpnkeefij"></a>
    <a href="https://addons.mozilla.org/en-US/firefox/addon/copy-guard/"><img alt="Mozilla Add-on" src="https://img.shields.io/amo/v/copy-guard"></a>
    <a href="https://microsoftedge.microsoft.com/addons/detail/copy-guard/nkdddmepblpmknbobcpebakjehldaebj"><img alt="Edge Add-on" src="https://img.shields.io/badge/edge%20add--on-v1.1.0-blue"></a>
  </p>

  <p align="center">
    <img src="copyguard-gif.gif" alt="Copy Guard demo" />
  </p>
</p>

## About

This extension warns you whenever your copy action was hijacked. When you select text and copy it, this extension will compare your selection with the data that was added to your clipboard. If there is a difference, a native notification will be triggered.

## Features

- [x] Warns you when Javascript alters your clipboard data after copying
- [x] Warns you when the selection you copied contains hidden elements
- [ ] Whitelist or blacklist websites (coming soon)

## Building

1.  Clone repo
2.  `yarn`
3.  `yarn dev` to run the dev task in watch mode
4.  `yarn build` to build a production (minified) version

## Testing in Chrome

1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome or [_brave://extensions_](brave://extensions) in Brave.
3.  With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this repo

## Testing in Firefox

1.  Complete the steps to build the project above
2.  Run `yarn start:firefox` and a Firefox window will open with the extension installed.
