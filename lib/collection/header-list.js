var _ = require('../util').lodash,
    PropertyList = require('./property-list').PropertyList,
    Header = require('./header').Header,

    HeaderList;

_.inherit((

  /**
   * Contains a list of header elements
   *
   * @constructor
   * @extends {PropertyList}
   */
  HeaderList = function (parent, headers) {
      // this constructor is intended to inherit and as such the super constructor is required to be executed
      HeaderList.super_.call(this, Header, parent, headers);
  }), PropertyList);

_.assign(HeaderList.prototype, /** @lends HeaderList.prototype */ {
    /**
     * Gets size of a list of headers excluding standard header prefix.
     *
     * @returns {Number}
     */
    contentSize: function () {
        var raw = '';
        raw += Header.unparse(this, '\r\n');
        raw += '\r\n\r\n';
        return raw.length;
    }
});

_.assign(HeaderList, /** @lends HeaderList */ {
    /**
     * Defines the name of this property for internal use.
     * @private
     * @readOnly
     * @type {String}
     */
    _postman_propertyName: 'HeaderList',

    /**
     * Checks if the given object is a HeaderList
     *
     * @param {*} obj
     * @returns {Boolean}
     */
    isHeaderList: function (obj) {
        return Boolean(obj) && ((obj instanceof HeaderList) ||
          _.inSuperChain(obj.constructor, '_postman_propertyName', HeaderList._postman_propertyName));
    }
});

module.exports = {
    HeaderList: HeaderList
};
