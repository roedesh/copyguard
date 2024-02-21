# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-02-21

### Added

- Added support for Manifest V3

### Changes

- Simplified the check for clipboard changes
  - Instead of comparing text, we now simply check if `clipboardData` is not empty. This only happens when the clipboard was altered by Javascript. In all other cases it is hidden by the browser as a security measure.

## [1.3.0] - 2022-04-01

### Added

- Insights page
  - Overview of domains that alter clipboard data, and how often
  - Detail page for each domain, which includes the "before and after" of the clipboard data for each warning that was triggered.
  - Includes a button to save the data to a JSON file

### Changed

- Hidden elements without any text inside do no longer trigger a warning, as they pose no danger. This fixes some false positives.

## [1.2.1] - 2022-02-25

### Changed

- Fixed error caused by undefined `whitelist` value

## [1.2.0] - 2022-02-10

### Added

- Settings page
  - Whitelisting
  - About section

### Changed

- Better Typescript support
  - Replaced `webextension-polyfill-ts` with `@types/webextension-polyfil`
  - Updated unit tests to support this migration
  - Removed Mockzilla

## [1.1.0] - 2020-12-15

### Added

- Added check for offscreen and hidden elements

## [1.0.1] - 2020-12-09

### Added

- Initial version
- Checks the users text selection against the contents of their clipboard
  - Shows a notification if there is a difference

[unreleased]: https://github.com/roedesh/copyguard/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/roedesh/copyguard/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/roedesh/copyguard/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/roedesh/copyguard/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/roedesh/copyguard/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/roedesh/copyguard/releases/tag/v1.0.1
