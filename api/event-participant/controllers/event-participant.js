const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services['event-participant'].search(ctx.query);
    } else {
      let populate = ['event', 'event.users_permissions_user']
      entities = await strapi.services['event-participant'].find(ctx.query, populate);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models['event-participant'] }));
  },
};


'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {};
