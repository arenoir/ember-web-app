'use strict';

const assert = require('assert');
const faviconLinkTags = require('../../lib/favicon-link-tags');

describe('Unit: faviconLinkTags()', function() {
  it('excludes icons that are not targeted for favicon', function() {
    let config = {
      rootURL: '/qux/',
    };
    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          sizes: '180x180',
          targets: ['manifest'],
        },
        {
          src: '/bar/baz.png',
          sizes: '280x280',
        },
      ],
    };

    let expected = [];

    assert.deepStrictEqual(faviconLinkTags(manifest, config), expected);
  });

  it('returns empty array when icons is not defined', function() {
    let config = {};
    let manifest = {};
    let expected = [];

    assert.deepStrictEqual(faviconLinkTags(manifest, config), expected);
  });

  it('returns empty array when icons is empty', function() {
    let config = {};
    let manifest = {
      icons: [],
    };
    let expected = [];

    assert.deepStrictEqual(faviconLinkTags(manifest, config), expected);
  });

  it('does not render sizes attribute when is not defined', function() {
    let config = {
      rootURL: '/',
    };
    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          targets: ['favicon'],
        },
      ],
    };

    let expected = ['<link rel="icon" href="/foo/bar.png">'];

    assert.deepStrictEqual(faviconLinkTags(manifest, config), expected);
  });

  it('renders sizes attribute when it is defined', function() {
    let config = {
      rootURL: '/',
    };
    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          sizes: '16x16',
          targets: ['favicon'],
        },
      ],
    };

    let expected = ['<link rel="icon" href="/foo/bar.png" sizes="16x16">'];

    assert.deepStrictEqual(faviconLinkTags(manifest, config), expected);
  });

  it('does not render type attribute when is not defined', function() {
    let config = {
      rootURL: '/',
    };
    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          targets: ['favicon'],
        },
      ],
    };

    let expected = ['<link rel="icon" href="/foo/bar.png">'];

    assert.deepStrictEqual(faviconLinkTags(manifest, config), expected);
  });

  it('renders type attribute when it is defined', function() {
    let config = {
      rootURL: '/',
    };
    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          type: 'image/png',
          targets: ['favicon'],
        },
      ],
    };

    let expected = ['<link rel="icon" href="/foo/bar.png" type="image/png">'];

    assert.deepStrictEqual(faviconLinkTags(manifest, config), expected);
  });

  it('uses an empty string as rootURL if it is undefined', function() {
    let config = {};

    let manifest = {
      icons: [
        {
          src: 'bar.png',
          targets: ['favicon'],
        },
      ],
    };

    let expected = ['<link rel="icon" href="bar.png">'];

    assert.deepStrictEqual(faviconLinkTags(manifest, config), expected);
  });

  it('respects absolute urls', function() {
    let config = {
      rootURL: '/qux/',
    };
    let manifest = {
      icons: [
        {
          src: 'http://www.example.com/foo/bar.png',
          targets: ['favicon'],
        },
        {
          src: 'https://www.example.com/bar/baz.png',
          targets: ['favicon'],
        },
      ],
    };

    let expected = [
      '<link rel="icon" href="http://www.example.com/foo/bar.png">',
      '<link rel="icon" href="https://www.example.com/bar/baz.png">',
    ];

    assert.deepStrictEqual(faviconLinkTags(manifest, config), expected);
  });
});
