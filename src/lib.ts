import Chalk from 'chalk'
import FS from 'fs'

type Dependencies = Array<{[key: string]: string}>

function printLine (): void {
  console.log(Chalk.gray('--------------------------------------------------------------------------------'))
}

function printError (msg: string, kill: boolean = true): void {
  console.error(Chalk.red('--------------------------------------------------------------------------------'))
  console.error(`${Chalk.red.bold('!! ERROR !!')} ${Chalk.red(msg)}`)
  console.error(Chalk.red('--------------------------------------------------------------------------------'))
  if (kill) process.exit(1)
}

function getDeps (path: string, dev: boolean = false): Dependencies {
  const { dependencies, devDependencies } = JSON.parse(FS.readFileSync(path).toString())
  return dev ? devDependencies : dependencies
}

function crawlDeps (dependencies: Dependencies, dev: boolean = false): void {
  const count = Object.keys(dependencies).length
  console.log(Chalk.white(`Crawling ${dev ? 'dev ' : ''}dependencies ${dev ? ' ' : '     '}${Chalk.yellow(`(${count} total)`)}`))
  printLine()
}

export function analyze (packagePath: string, modulesPath: string, excludeDev: boolean): void {
  console.log(`${Chalk.gray('Analyzing package file............')} ${Chalk.green(packagePath)}`)
  console.log(`${Chalk.gray('Analyzing node modules directory..')} ${Chalk.green(modulesPath)}`)
  console.log(`${Chalk.gray('Excluding dev dependencies........')} ${Chalk.green(excludeDev)}`)

  if (!FS.existsSync(packagePath)) printError(`Package file not found: ${packagePath}`)
  if (!FS.existsSync(modulesPath)) printError(`Node modules directory not found: ${modulesPath}`)

  printLine()

  const dependencies = getDeps(packagePath, false)
  crawlDeps(dependencies)
  if (!excludeDev) {
    const devDependencies = getDeps(packagePath, true)
    crawlDeps(devDependencies, true)
  }
}
