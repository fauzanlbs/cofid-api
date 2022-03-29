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
      entities = await strapi.services.eventParticipant.search(ctx.query);
    } else {
      entities = await strapi.services.eventParticipant.find(ctx.query, [
        {
          path: 'event',
          populate: {
            path: 'users_permissions_user',
          },
        },
      ]);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.eventParticipant }));
  },
};
