'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  '*/1 * * * *': async () => {
    console.log('1 minute later');
    const userExpired = await strapi.api.profile.services.profile.find({
        pcr_date_gt: new Date(),
      });
    console.log('ini userExpirednya', userExpired);
  },
};
