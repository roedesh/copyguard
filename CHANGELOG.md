# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- This CHANGELOG file
- Package "jest-webextension-mock"

### Changed

- Better Typescript support
  - Replaced `webextension-polyfill-ts` with `@types/webextension-polyfil`
  - Updated unit tests to support this migration

### Removed

- Packages `mockzilla` and `mockzilla-webextension`

## [1.1.0] - 2020-12-15

### Added

- Added check for offscreen and hidden elements

## [1.0.1] - 2014-12-09

### Added

- Initial version
- Checks the users text selection against the contents of their clipboard
  - Shows a notification if there is a difference

[unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/roedesh/copyguard/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/roedesh/copyguard/releases/tag/v1.0.1
