<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="dist/icon48.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Copy Guard</h3>

  <p align="center">
    A simple browser extension that warns you when your copy action was hijacked.
  </p>

  <p align="center">
    <img src="copyguard-gif.gif" alt="Awesome README Templates" />
  </p>
</p>

## About

Whenever the _copy_ event is fired, this browser will compare your text selection with the data that was added to your clipboard. If there is a difference, a native notification will be triggered.

## Building

1.  Clone repo
2.  `npm i`
3.  `npm run dev` to compile once or `npm run watch` to run the dev task in watch mode
4.  `npm run build` to build a production (minified) version

## Testing in Chrome

1.  Complete the steps to build the project above
2.  Go to [_chrome://extensions_](chrome://extensions) in Google Chrome or [_brave://extensions_](brave://extensions) in Brave.
3.  With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this repo

## Testing in Firefox

Run `yarn start:firefox` and a Firefox window will open with the extension installed.