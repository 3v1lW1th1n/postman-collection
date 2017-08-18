var expect = require('expect.js'),
    FormParam = require('../../lib/index.js').FormParam;

/* global describe, it */
describe('FormParam', function () {
    describe('constructor', function () {
        it('should correctly construct a FormParam instance', function () {
            var raw = { key: 'foo', value: 'bar' },
                fp = new FormParam(raw);
            expect(fp.toJSON()).to.eql(raw);
        });

        it('should default to empty strings for keys and values if none are provided', function () {
            var fp = new FormParam();
            expect(fp.toJSON()).to.eql({ key: '', value: '' });
        });
    });

    describe('.toString', function () {
        it('should unparse the FormParam instance correctly', function () {
            var fp = new FormParam({ key: 'foo', value: 'bar' });
            expect(fp.toString()).to.be('foo=bar');
        });
    });
});
