#!/usr/bin/env node

import * as fs from 'fs';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

interface Args {
  input: string;
  output: string;
  watch: boolean;
}

const parseArguments = (): Args => {
  try {
    const argv = yargs(hideBin(process.argv)).options({
      'input': { type: 'string', default: './TailwindGenerated.css' },
      'output': { type: 'string', default: './ReadyForLitimport.js' },
      'watch': { type: 'boolean', default: false },
    }).parseSync();

    return { input: argv.input, output: argv.output, watch: argv.watch };
  } catch (e) {
    console.warn(`Error reading input/output parameters ${e}`);
    process.exit(1);
  }
};

const processFile = (input: string, output: string): void => {
  try {
    const contents = fs.readFileSync(input, 'utf8');
    let cleanContents = contents.replaceAll('`', '');
    cleanContents = cleanContents.replaceAll('\\', '\\\\');

    const litContents = `
      import { css } from 'lit';
      export const TWStyles = css\` ${cleanContents} \`
    `;

    fs.writeFileSync(output, litContents);
    console.log(`TWLit - wrote to file ${output}`);
  } catch (err) {
    console.log(`Failed to read file ${input}. Might just not be created yet? retrying..`);
  }
};

const main = (): void => {
  const { input, output, watch } = parseArguments();

  console.log(`Reading from file ${input}`);
  console.log(`Writing to ${output}`);

  if (watch) {
    fs.watchFile(input, { interval: 1000 }, () => processFile(input, output));
  } else {
    processFile(input, output);
  }
};

main();