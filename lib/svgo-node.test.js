'use strict';

/**
 * @typedef {import('../lib/types').Plugin} Plugin
 */

const { optimize, loadConfig } = require('./svgo-node.js');

describe('with LF line-endings', () => {
  test('should work', () => {
    const svg = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg viewBox="0 0 120 120">
        <desc>
          Not standard description
        </desc>
        <circle fill="#ff0000" cx="60" cy="60" r="50"/>
      </svg>
    `;
    const { data } = optimize(svg);
    // using toEqual because line endings matter in these tests
    expect(data).toEqual(
      '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="red"/></svg>'
    );
  });

  test('should respect config', () => {
    const svg = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg viewBox="0 0 120 120">
        <desc>
          Not standard description
        </desc>
        <circle fill="#ff0000" cx="60" cy="60" r="50"/>
      </svg>
    `;
    const { data } = optimize(svg, {
      js2svg: { pretty: true, indent: 2 },
    });
    // using toEqual because line endings matter in these tests
    expect(data).toEqual(
      '<svg viewBox="0 0 120 120">\n  <circle cx="60" cy="60" r="50" fill="red"/>\n</svg>\n'
    );
  });

  test('should respect line-ending config', () => {
    const svg = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg viewBox="0 0 120 120">
        <desc>
          Not standard description
        </desc>
        <circle fill="#ff0000" cx="60" cy="60" r="50"/>
      </svg>
    `;
    const { data } = optimize(svg, {
      js2svg: { eol: 'crlf', pretty: true, indent: 2 },
    });
    // using toEqual because line endings matter in these tests
    expect(data).toEqual(
      '<svg viewBox="0 0 120 120">\r\n  <circle cx="60" cy="60" r="50" fill="red"/>\r\n</svg>\r\n'
    );
  });
});

describe('loadConfig', () => {
  test('fails with not implemented error', async () => {
    await expect(
      loadConfig('something', 'something-else')
    ).rejects.toThrowError(
      'Not implemented error. React Native does not support dynamic imports. ' +
        'This package (`react-native-svgo`) is meant to be used with react-native, ' +
        'if you are not using react-native please consider using the original `https://github.com/svg/svgo` package.'
    );
  });
});
