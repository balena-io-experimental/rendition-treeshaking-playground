# Rendition treeshaking playground

Started to ease investigating tree shaking in [rendition].

Inspired by Webpack's [side-effects example].

[side-effects example]: https://github.com/webpack/webpack/tree/master/examples/side-effects
[rendition]: https://github.com/balena-io-modules/rendition/

# Gettings started

* Run `npm ci && git restore node_modules` to install all dependencies & restore the test node_modules that the repository includes.
* Run `npm start` to build with webpack build & open the bundle analyzer.
