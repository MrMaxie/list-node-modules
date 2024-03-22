# list-node-modules

Enables listing of all installed dependencies in selected directory, including nested ones, in Node projects

## Installation

```bash
npm install list-node-modules
```

## Usage

```ts
import { listNodeModules } from 'list-node-modules';

// Then, you can call listNodeModules with an optional Options object:

const modules = listNodeModules({
    path: 'path/to/directory', // Optional. Defaults to process.cwd()
    excludeNames: ['exclude-module'], // Optional. Defaults to []
    excludeFiles: ['exclude-file.js'], // Optional. Defaults to []
    panicOnError: true, // Optional. Defaults to false
    filters: ['node_modules/**/package.json'], // Optional. Defaults to ['node_modules/**/package.json']
});

console.log(modules);
```

## Options

The `listNodeModules` function accepts an `Options` object with the following properties:

- `path`: The path to search for node modules. Defaults to `process.cwd()`.
- `excludeNames`: An array of module names to exclude from the list. Defaults to `[]`.
- `excludeFiles`: An array of file names to exclude from the list. Used in glob `ignore` option. Defaults to `[]`.
- `panicOnError`: Specifies whether to throw an error if an error occurs during the listing process. Defaults to `false`.
- `filters`: An array of filters to apply when listing node modules. Accepts glob patterns, so you can even define negated patterns like `!node_modules/**/package.json` to exclude certain files. Defaults to `['node_modules/**/package.json']`.

## Examples

List all node modules packages from current working directory `node_modules` and all nested directories:

```javascript
const modules = listNodeModules();
console.log(modules); // ['list-node-modules', 'glob', ...] and so on
```

List node modules in a specified directory, excluding specific modules:

```javascript
const modules = listNodeModules({
    path: 'other/module',
    excludeNames: ['exclude-this-module'],
});
console.log(modules); // everyting used in 'other/module' except 'exclude-this-module'
```

## License

This package is licensed under the terms specified in the [LICENSE](./LICENSE) file.

For more information on licensing, please refer to the license file.
