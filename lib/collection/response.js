var _ = require('../util').lodash,
    Property = require('./property').Property,
    Request = require('./request').Request,
    Header = require('./header').Header,
    Cookie = require('./cookie').Cookie,
    PropertyList = require('./property-list').PropertyList,

    Response;

_.inherit((
    /**
     * Response holds data related to the request body. By default, it provides a nice wrapper for url-encoded,
     * form-data, and raw types of request bodies.
     *
     * @constructor
     * @extends {Property}
     *
     * @param {Object} options
     */
    Response = function PostmanResponse (options) {
        // this constructor is intended to inherit and as such the super constructor is required to be executed
        Response.super_.apply(this, arguments);
        if (!options) { return; } // in case definition object is missing, there is no point moving forward

        this.update(options);
    }), Property);

_.extend(Response.prototype, /** @lends Response.prototype */ {
    update: function (options) {
        _.extend(this, /** @lends Response.prototype */ {
            /**
             * @type {Request}
             */
            request: options.originalRequest ? new Request(options.originalRequest) : undefined,

            /**
             * @type {String}
             */
            status: options.status,

            /**
             * @type {Number}
             */
            code: options.code,

            /**
             * @type {PropertyList<Header>}
             */
            headers: options.header ? new PropertyList(Header, this, options.header) : undefined,

            /**
             * @type {String}
             */
            data: options.data,

            /**
             * @type {PropertyList<Cookie>}
             */
            cookies: options.cookie ? new PropertyList(Cookie, this, options.cookie) : undefined,

            /**
             * Time taken for the request to complete.
             *
             * @type {Number}
             */
            responseTime: options.responseTime
        });
    },

    toJSON: function () {
        return {
            originalRequest: this.request.toJSON(),
            status: this.status,
            code: this.code,
            header: PropertyList.isPropertyList(this.headers) ? this.headers.map(function (header) {
                return header.toJSON();
            }) : undefined,
            data: this.data,
            cookie: PropertyList.isPropertyList(this.cookies) ? this.cookies.map(function (cookie) {
                return cookie.toJSON();
            }) : undefined,
            responseTime: this.responseTime
        };
    }
});

module.exports = {
    Response: Response
};
