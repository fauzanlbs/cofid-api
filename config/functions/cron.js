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
   * Every monday at 1am.
   */
  '0 1 * * 1': async () => {
    let todayDate = new Date();
    
    // find all users that has expired test date
    const usersExpired = await strapi.api.profile.services.profile.find({
      swab_date_null: false,
      swab_date_lt: todayDate.toISOString().substring(0,10)
    });

    // update test date
    await Promise.all(usersExpired.map(item => {
      let day = 0;

      if (item.users_permissions_user?.risk_level == 'Very High') {
        day = 7;
      } else if (item.users_permissions_user?.risk_level == 'High') {
        day = 14;
      } else if (item.users_permissions_user?.risk_level == 'Medium') {
        day = 28;
      }
      let newDate = new Date(item.swab_date);
      newDate.setDate(datetest.getDate() + day);

      return strapi.api.profile.services.profile.update(
        { id: item.id },
        { swab_date: newDate }
      );

    }));
  },
};
