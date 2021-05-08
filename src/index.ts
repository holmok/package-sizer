#!/usr/bin/env node
import { Command, Option } from 'commander'
import FS from 'fs'
import Path from 'path'
import { analyze } from './lib'

const { version } = JSON.parse(FS.readFileSync(Path.join(__dirname, '../package.json')).toString())
const program = new Command()
program.version(version)

program
  .addOption(new Option('-p, --package <package.json>', 'path to package.json file.').default('package.json'))
  .addOption(new Option('-m, --modules <node_modules>', 'path to node_modules directory.').default('node_modules'))
  .addOption(new Option('-x, --exclude-dev', 'excludes dev dependencies').default(false))

program.parse(process.argv)
const options = program.opts()

const packagePath = Path.join(process.cwd(), options.package)
const modulesPath = Path.join(process.cwd(), options.modules)

analyze(packagePath, modulesPath, options.excludeDev)
