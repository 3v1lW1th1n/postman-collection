var _ = require('../util').lodash,
    uuid = require('node-uuid'),
    Property = require('./property').Property,
    PropertyList = require('./property-list').PropertyList,
    EventList = require('./event-list').EventList,
    Request = require('./request').Request,
    Response = require('./response').Response,

    Item;

_.inherit((
    /**
     * A Postman Collection Item that holds your request definition, responses and other stuff
     * @constructor
     * @extends {Property}
     *
     * @param {Object} options
     */
    Item = function PostmanItem (options) {
        // this constructor is intended to inherit and as such the super constructor is required to be excuted
        Item.super_.apply(this, arguments);
        if (!options) { return; } // in case definition object is missing, there is no point moving forward

        _.merge(this, {
            /**
             * The request in this item
             * @type {Request}
             */
            request: new Request(options.request),
            /**
             * List of sample responses
             * @type {PropertyList<Response>}
             */
            responses: new PropertyList(Response, this, options.response),
            /**
             * Events of this item
             * @type {EventList}
             */
            events: new EventList(this, options.event)
        });

        // if id is not defined (by virtue of inheriting PostmanProperty), then we create a new one
        !this.id && (this.id = uuid.v4());
    }), Property);

_.extend(Item.prototype, /** @lends Item.prototype */ {
    // TODO: Think about this name @shamasis
    processAuth: function () {
        return this.request.authorize();
    },

    /**
     * Returns Events corresponding to a particular event name. If no name is given, returns all events
     *
     * @param name {String}
     */
    getEvents: function (name) {
        if (!name) {
            return this.events.all(); // return all events if name is not provided.
        }
        return this.events.filter(function (ev) {
            return ev.listen === name;
        });
    },

    toJSON: function () {
        return {
            id: this.id,
            description: this.description ? this.description.toJSON() : undefined,
            request: this.request.toJSON(),
            response: this.responses ? this.responses.map(function (response) {
                return response.toJSON();
            }) : undefined,
            event: this.events ? this.events.map(function (event) {
                return event.toJSON();
            }) : undefined
        };
    }
});

_.extend(Item, /** @lends Item */ {
    /**
     * Check whether an object is an instance of PostmanItem.
     *
     * @param {*} obj
     * @returns {Boolean}
     */
    isItem: function (obj) {
        return obj && (obj instanceof Item);
    }
});

module.exports = {
    Item: Item
};
