'use strict';
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async calculateRisk(ctx) {
        
        const id = ctx.params.id;
        const q2 = strapi.query('result').findOne({ users_permissions_user: id, questioner: 2 });
        const q3 = strapi.query('result').findOne({ users_permissions_user: id, questioner: 3 });
        const q4 = strapi.query('result').findOne({ users_permissions_user: id, questioner: 4 });
        const q5 = strapi.query('result').findOne({ users_permissions_user: id, questioner: 5 });
        const profile = strapi.query('profile').findOne({ users_permissions_user: id });

        let total = q2.score ? q2.score : 0 + q3.score ? q3.score : 0 + q4.score ? q4.score : 0 + q5.score ? q5.score : 0;

        //default color is green
        let color_risk = 'green';

        //if non honest, total will * 1.2
        if (profile.non_honest) {
            total = total * 1.2;
        }

        //if have red zone status, will got red
        if (profile.red_zone == 1) {
            color_risk = 'red';
            return color_risk;
        }

        //range

        if (profile.consequence > 15 && total < 22) {
            color_risk = 'yellow';
        } else if (profile.consequence > 15 && total >= 22 && total <= 32) {
            color_risk = 'orange';
        } else if (profile.consequence > 15 && total >= 32) {
            color_risk = 'orange';
        } else if (profile.consequence > 15 && (profile.non_honest || profile.non_masker || profile.non_masker_social)
        ) {
            color_risk = 'red';
        }

        if (profile.consequence >= 8 && profile.consequence <= 15 && total < 22) {
            color_risk = 'green';
        } else if (profile.consequence >= 8 && profile.consequence <= 15 && total >= 22 && total <= 32
        ) {
            color_risk = 'yellow';
        } else if (
            profile.consequence >= 8 && profile.consequence <= 15 && total >= 32
        ) {
            color_risk = 'orange';
        } else if (profile.consequence >= 8 && profile.consequence <= 15 && (profile.non_honest || profile.non_masker || profile.non_masker_social)
        ) {
            color_risk = 'red';
        }

        if (profile.consequence >= 1 && profile.consequence <= 7 && total < 22) {
            color_risk = 'green';
        } else if (profile.consequence >= 1 && profile.consequence <= 7 && total >= 22 && total <= 32
        ) {
            color_risk = 'yellow';
        } else if (profile.consequence >= 1 && profile.consequence <= 7 && total >= 32
        ) {
            color_risk = 'yellow';
        } else if (profile.consequence >= 1 && profile.consequence <= 7 && (profile.non_honest || profile.non_masker || profile.non_masker_social)
        ) {
            color_risk = 'orange';
        }

        if ((profile.consequence == 0 || profile.consequence == null) && total < 22) {
            color_risk = 'green';
        } else if ((profile.consequence == 0 || profile.consequence == null) && total >= 22 && total <= 32) {
            color_risk = 'green';
        } else if ((profile.consequence == 0 || profile.consequence == null) && total >= 32) {
            color_risk = 'green';
        } else if ((profile.consequence == 0 || profile.consequence == null) && (profile.non_honest || profile.non_masker || profile.non_masker_social)
        ) {
            color_risk = 'yellow';
        }

        return color_risk;

    }
};