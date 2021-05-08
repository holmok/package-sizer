# PACKAGE-SIZER

Crawl your `package.json` file and see the sizes of the packages you depend on.

![packages](./packages.png)

### Sample output (For this repo!)

``` bash
$ package-sizer
Analyzing package file............ package.json
Analyzing node modules directory.. node_modules
Excluding dev dependencies........ false
--------------------------------------------------------------------------------
Crawling dependencies      (2 total)
--------------------------------------------------------------------------------
Crawling dev dependencies  (7 total)
--------------------------------------------------------------------------------
```

## Install & Run

```
$ npm install -g package-sizer
$ package-sizer
```

## Options
```
Usage: index [options]

Options:
  -V, --version                 output the version number
  -p, --package <package.json>  path to package.json file. (default: "package.json")
  -m, --modules <node_modules>  path to node_modules directory. (default: "node_modules")
  -x, --exclude-dev             excludes dev dependencies (default: false)
  -h, --help                    display help for command
```