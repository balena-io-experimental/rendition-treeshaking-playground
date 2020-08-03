# Rendition treeshaking playground

Started to ease investigating tree shaking in [rendition] using Webpack (but other bundlers should also work similarly).

Inspired by Webpack's [side-effects example].

[side-effects example]: https://github.com/webpack/webpack/tree/master/examples/side-effects
[rendition]: https://github.com/balena-io-modules/rendition/

# Gettings started

* Run `npm ci && git restore node_modules` to install all dependencies & restore the test node_modules that the repository includes.
* Run `npm start` to build with Webpack build & open the bundle analyzer.

# Notes

Bundlers like Webpack & Rollup can use treeshaking effectively only when the final source files used for bundling are using the es6 import syntax.
If at any point they get converted (eg: to commonjs `require` calls) then treeshaking will not work or might only work to a certain degree.

## TypeScript

Make sure to set the following `compilerOptions` in your `tsconfig.json`:
```
"module": "es2015",
"moduleResolution": "node",
```

## Babel

Make sure to use `"modules": false` in your `.babelrc`.
PS: Depending if you target node or browsers, `"modules": "auto"` might also work.

## Dead code elimination

Webpack's treeshaking implementation is only responsible for removing unused import.
Unused functions within modules are removed by the minifier (atm Terser is the default).
As a result you will only see unused function be removed from the bundle when Webpack is
using `mode: 'production'` or the `optimization.minimize` is set to `true`.

## Treeshake-able packages

A package is treeshake-able when they provide a dist using the es6 import syntax and when
it has its side-effects appropriately marked.

### ES6 module dist

Treeshaking friendly packages should provide a dist that uses the es6 module syntax.
That can be done by either:
* use the `module` field in the `package.json` that points to an alternative dist using the es6 module syntax
* or have the `package.json` `main` field point to a dist using the es6 module syntax

The second option is not often used, since historically the files pointed by the main
are using commonjs exports so that they can be used as is in node environments.

Here is an example of how rendition does this.
See: https://github.com/balena-io-modules/rendition/blob/8b9c3b7d7aef359a5c18adfe9f3cb96d1021e4d3/package.json#L11

### Side-effects

The module should have a `sideEffects` field in its `package.json` that is:
* either `false` if the module has no files with side-effects
  See: https://github.com/balena-io-modules/rendition/blob/8b9c3b7d7aef359a5c18adfe9f3cb96d1021e4d3/package.json#L12
* or an array with the paths of the files that do have side-effects, so that the bundlers can handle them approprietly
  See: https://github.com/grommet/grommet/blob/50a5e67af56781c2d5992edddbbd9bf0d6261fb1/package.json#L7-L10
