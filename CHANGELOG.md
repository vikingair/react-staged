# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.10.0] - 2021-08-18
### Changed
- `onSwipe` now receives an object containing the numbers `pos`, `diff` and `direction`. Previously
  it was only called by `pos`, but this made it impossible to reliably determine, if
  the paging was done to the right or to the left in all cases.
- `onSwipe` will be called now when the swiping gets fired, instead of being fired
  after the swiping was completed.
- The CSS variable `--s-transform-x` is now unit-less, giving more flexibility when
  consuming this value for further kinds of style adjustments.
- CSS variables are getting initialized in the scope of the outer staged element instead of
  the global `:root` context.
### Added
- A new CSS variable `--s-width` allows to access the current width of the
  staged container.
- Added optional `className` properties.

## [0.9.1] - 2021-06-23
### Added
- Export types `StagedRef` and `SlideAnimation`

## [0.9.0] - 2020-11-17
### Fixed
- Allow later React versions as peer dependency
- Fix a TS problem and adding more strictness

## [0.8.0] - 2020-02-17
### Added
- Allow passing `ref` to control paging from outer context.



