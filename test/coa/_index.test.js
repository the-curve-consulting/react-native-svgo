'use strict';

const { Command } = require('commander');
const svgo = require('../../lib/svgo/coa.js');

function runProgram(args) {
  const program = new Command();
  svgo(program);
  // prevent running process.exit
  program.exitOverride(() => {});
  // parser skips first two arguments
  return program.parseAsync([0, 1, ...args]);
}

describe('coa', function () {
  it('fails with not implemented error', async () => {
    await expect(
      runProgram('something', 'something-else')
    ).rejects.toThrowError(
      'Not implemented error. React Native does not support dynamic imports. ' +
        'This package (`react-native-svgo`) is meant to be used with react-native, ' +
        'if you are not using react-native please consider using the original `https://github.com/svg/svgo` package.'
    );
  });
});
