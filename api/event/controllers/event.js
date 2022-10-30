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
      entities = await strapi.services.event.search(ctx.query, ['image', 'users_permissions_user', 'event_participants', 'event_participants.users_permissions_user', 'event_participants.users_permissions_user.profile', 'event_participants.users_permissions_user.profile.result_test_image']);
    } else {
      entities = await strapi.services.event.find(ctx.query, ['image', 'users_permissions_user', 'event_participants', 'event_participants.users_permissions_user', 'event_participants.users_permissions_user.profile', 'event_participants.users_permissions_user.profile.result_test_image']);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.event }));
  },
};
