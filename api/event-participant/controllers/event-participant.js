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
      entities = await strapi.services.event-participant.search(ctx.query);
    } else {
      entities = await strapi.services.event-participant.find(ctx.query, [
        'event', 
        'event.users_permissions_user',
      ]);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.event-participant }));
  },
};
